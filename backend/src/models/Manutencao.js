import mongoose from "mongoose";

const ManutencaoSchema = new mongoose.Schema(
  {
    maquina: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Maquina",
      required: true
    },
    dataAgendada: {
      type: Date,
      required: true
    },
    tecnico: {
      type: String,
      required: true,
      trim: true
    },
    descricao: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["Agendada", "Em andamento", "Concluída", "Cancelada"],
      default: "Agendada"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Manutencao", ManutencaoSchema);