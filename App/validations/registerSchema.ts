import { z } from "zod";

export const registerStepOne = z.object({
  firstName: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  lastName: z.string().min(3, "Sobrenome precisa ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
});

export const registerStepTwo = z.object({
  userType: z
    .string()
    .min(3, "Tipo de usuário precisa ter pelo menos 3 caracteres"),
  birthDate: z.string().min(10, "Data de nascimento inválida"),
  phone: z.string().min(15, "Telefone inválido"),
});

export const registerStepThree = z
  .object({
    password: z.string().min(8, "Senha precisa ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });
