import { z } from "zod";

export const registerStepOne = z.object({
  firstName: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  lastName: z.string().min(3, "Sobrenome precisa ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um email válido"),
});

export const registerStepTwo = z.object({
  userType: z.string().min(3, "Escolha um tipo de usuário"),
  birthDate: z.string().min(10, "Data de nascimento inválida"),
  phone: z.string().min(15, "Digite um numero de telefone válido"),
});

export const registerStepThree = z
  .object({
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });
