import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UsuarioSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Usuario"], default: "Usuario" }
  },
  { timestamps: true }
);

// MIDDLEWARE: Criptografa senha antes de salvar
UsuarioSchema.pre('save', async function(next) {
  console.log('🔍 Hook pre(save) executado!');
  console.log('🔍 isModified(password):', this.isModified('password'));
  console.log('🔍 Senha antes:', this.password);
  
  // Só criptografa se a senha foi modificada ou é nova
  if (!this.isModified('password')) {
    console.log('⏭️  Senha não modificada, pulando criptografia');
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('✅ Senha criptografada:', this.password.substring(0, 20) + '...');
    next();
  } catch (error) {
    console.error('❌ Erro ao criptografar:', error);
    next(error);
  }
});

// MÉTODO: Compara senha com hash
UsuarioSchema.methods.comparePassword = async function(candidatePassword) {
  console.log('🔍 Comparando senhas...');
  const result = await bcrypt.compare(candidatePassword, this.password);
  console.log('🔍 Senha válida:', result);
  return result;
};

export default mongoose.model("Usuario", UsuarioSchema);