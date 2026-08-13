// Central configuration file for BCred Fácil
// Edit this file to update company data across all pages and components.

export interface CompanyConfig {
  name: string;
  razaoSocial: string;
  cnpj: string;
  cnpjIsReady: boolean;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  phoneIsReady: boolean;
  whatsapp: string;
  whatsappIsReady: boolean;
  whatsappFormatted: string;
  email: string;
  workingHours: string;
  serviceArea: string;
  instagram: string;
  model: 'Correspondente Bancário' | 'Promotora' | 'Intermediadora' | 'Geradora de Leads';
  instituicaoContratante?: string;
  registroRegulatorio?: string;
  partners: string[];
  tracking: {
    gtmId: string;
    gaId: string;
    pixelId: string;
  };
  financialConditions: {
    hasValidatedData: boolean;
    minMonths?: number;
    maxMonths?: number;
    minInterestRate?: string;
    maxInterestRate?: string;
    cetMin?: string;
    cetMax?: string;
    iof?: string;
    tarifas?: string;
    representativeExample?: {
      valorSolicitado: number;
      parcelas: number;
      valorParcela: number;
      valorTotalPago: number;
      instituicaoResponsavel: string;
    };
    disclaimer: string;
  };
}

export const companyConfig: CompanyConfig = {
  name: "BCRED FACIL",
  razaoSocial: "BCRED CORRESPONDENTE FINANCEIRO LTDA",
  cnpj: "65.100.714/0001-17",
  cnpjIsReady: true,
  address: "R. Gov. Portela, 1200 - Centro, Nova Iguaçu - RJ, 26221-030",
  city: "Nova Iguaçu",
  state: "RJ",
  zipCode: "26221-030",
  phone: "(21) 3927-0911",
  phoneIsReady: true,
  whatsapp: "552139270911",
  whatsappIsReady: true,
  whatsappFormatted: "(21) 3927-0911",
  email: "bcred@bcred.net",
  workingHours: "Segunda a Sexta, das 8h às 18h",
  serviceArea: "Nova Iguaçu e região",
  instagram: "https://www.instagram.com/bcredfacil?igsh=MW04ZGV5cW5hOWM2eQ==",
  model: "Promotora",
  instituicaoContratante: "",
  registroRegulatorio: "",
  partners: [
    "Instituições Financeiras disponíveis em nossa operação"
  ],
  tracking: {
    gtmId: "",
    gaId: "",
    pixelId: ""
  },
  financialConditions: {
    hasValidatedData: false,
    disclaimer: "Taxas, valores, prazos e parcelas variam conforme modalidade, perfil, margem disponível e condições da instituição financeira responsável. A simulação não representa garantia de aprovação ou contratação."
  }
};
