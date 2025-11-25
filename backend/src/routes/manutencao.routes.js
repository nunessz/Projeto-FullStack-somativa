import express from 'express';
import Manutencao from '../models/Manutencao.js';
import Maquina from '../models/Maquina.js';

const router = express.Router();

// GET - Buscar todas as manutenções (filtrado por usuário)
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Buscar máquinas do usuário
    const maquinasDoUsuario = await Maquina.find({ usuario: userId }).select('_id');
    const maquinaIds = maquinasDoUsuario.map(m => m._id);

    // Buscar apenas manutenções das máquinas do usuário
    const manutencoes = await Manutencao.find({ maquina: { $in: maquinaIds } })
      .populate('maquina', 'name type status')
      .sort({ dataAgendada: -1 });
    
    res.json(manutencoes);
  } catch (error) {
    console.error('Erro ao buscar manutenções:', error);
    res.status(500).json({ error: 'Erro ao buscar manutenções' });
  }
});

// GET - Buscar manutenção por ID
router.get('/:id', async (req, res) => {
  try {
    const manutencao = await Manutencao.findById(req.params.id)
      .populate('maquina', 'name type status');
    
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }
    
    res.json(manutencao);
  } catch (error) {
    console.error('Erro ao buscar manutenção:', error);
    res.status(500).json({ error: 'Erro ao buscar manutenção' });
  }
});

// POST - Criar nova manutenção
router.post('/', async (req, res) => {
  try {
    const { maquina, dataAgendada, tecnico, descricao, userId } = req.body;

    // Validações
    if (!maquina || !dataAgendada || !tecnico || !descricao) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios' 
      });
    }

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    // Verificar se a máquina existe e pertence ao usuário
    const maquinaExiste = await Maquina.findOne({ _id: maquina, usuario: userId });
    if (!maquinaExiste) {
      return res.status(404).json({ error: 'Máquina não encontrada ou não pertence ao usuário' });
    }

    // Verificar se a máquina está com status "Parada"
    if (maquinaExiste.status !== 'Parada') {
      return res.status(400).json({ 
        error: 'Apenas máquinas com status "Parada" podem ter manutenção agendada' 
      });
    }

    // Verificar se a data é futura
    const dataManutencao = new Date(dataAgendada);
    const agora = new Date();
    if (dataManutencao < agora) {
      return res.status(400).json({ 
        error: 'A data da manutenção deve ser futura' 
      });
    }

    // Criar nova manutenção
    const novaManutencao = new Manutencao({
      maquina,
      dataAgendada,
      tecnico,
      descricao,
      status: 'Agendada',
      usuarioCriador: userId
    });

    await novaManutencao.save();

    // Atualizar o status da máquina para "Em manutenção"
    maquinaExiste.status = 'Em manutenção';
    await maquinaExiste.save();

    // Retornar a manutenção populada
    const manutencaoPopulada = await Manutencao.findById(novaManutencao._id)
      .populate('maquina', 'name type status');

    res.status(201).json(manutencaoPopulada);
  } catch (error) {
    console.error('Erro ao criar manutenção:', error);
    res.status(500).json({ error: 'Erro ao criar manutenção' });
  }
});

// PUT - Atualizar manutenção
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, dataAgendada, tecnico, descricao } = req.body;

    const manutencao = await Manutencao.findById(id).populate('maquina');
    
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }

    // Atualizar campos permitidos
    if (dataAgendada) manutencao.dataAgendada = dataAgendada;
    if (tecnico) manutencao.tecnico = tecnico;
    if (descricao) manutencao.descricao = descricao;
    if (status) {
      manutencao.status = status;

      // Se a manutenção foi concluída, atualizar status da máquina
      if (status === 'Concluída') {
        const maquina = await Maquina.findById(manutencao.maquina._id);
        if (maquina) {
          maquina.status = 'Funcionando';
          await maquina.save();
        }
      }

      // Se a manutenção foi cancelada, voltar máquina para "Parada"
      if (status === 'Cancelada') {
        const maquina = await Maquina.findById(manutencao.maquina._id);
        if (maquina) {
          maquina.status = 'Parada';
          await maquina.save();
        }
      }
    }

    await manutencao.save();

    // Retornar a manutenção atualizada e populada
    const manutencaoAtualizada = await Manutencao.findById(id)
      .populate('maquina', 'name type status');

    res.json(manutencaoAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar manutenção:', error);
    res.status(500).json({ error: 'Erro ao atualizar manutenção' });
  }
});

// DELETE - Deletar manutenção
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const manutencao = await Manutencao.findById(id).populate('maquina');
    
    if (!manutencao) {
      return res.status(404).json({ error: 'Manutenção não encontrada' });
    }

    // Se a manutenção estava agendada ou em andamento, voltar máquina para "Parada"
    if (manutencao.status === 'Agendada' || manutencao.status === 'Em andamento') {
      const maquina = await Maquina.findById(manutencao.maquina._id);
      if (maquina && maquina.status === 'Em manutenção') {
        maquina.status = 'Parada';
        await maquina.save();
      }
    }

    await Manutencao.findByIdAndDelete(id);

    res.json({ message: 'Manutenção deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar manutenção:', error);
    res.status(500).json({ error: 'Erro ao deletar manutenção' });
  }
});

// GET - Buscar manutenções por máquina
router.get('/maquina/:maquinaId', async (req, res) => {
  try {
    const manutencoes = await Manutencao.find({ maquina: req.params.maquinaId })
      .populate('maquina', 'name type status')
      .sort({ dataAgendada: -1 });
    
    res.json(manutencoes);
  } catch (error) {
    console.error('Erro ao buscar manutenções:', error);
    res.status(500).json({ error: 'Erro ao buscar manutenções' });
  }
});

// GET - Buscar manutenções por status
router.get('/status/:status', async (req, res) => {
  try {
    const manutencoes = await Manutencao.find({ status: req.params.status })
      .populate('maquina', 'name type status')
      .sort({ dataAgendada: -1 });
    
    res.json(manutencoes);
  } catch (error) {
    console.error('Erro ao buscar manutenções:', error);
    res.status(500).json({ error: 'Erro ao buscar manutenções' });
  }
});

export default router;