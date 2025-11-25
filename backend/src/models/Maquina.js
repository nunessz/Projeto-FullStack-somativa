import mongoose from "mongoose";

const MaquinaSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    type: { 
      type: String, 
      required: true, 
      trim: true 
    },
    status: { 
      type: String, 
      enum: ["Funcionando", "Parada", "Em manutenção"], 
      default: "Funcionando" 
    },
    // ✅ CAMPO CRÍTICO: vincula máquina ao usuário
    usuario: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Usuario",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Maquina", MaquinaSchema);