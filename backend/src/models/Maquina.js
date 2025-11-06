import mongoose from "mongoose";

const MaquinaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: ["Em manutenção", "Funcionando", "Parada"], default: "Status" }
  },
  { timestamps: true }
);

export default mongoose.model("Maquina", MaquinaSchema);
