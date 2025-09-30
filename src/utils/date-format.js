const formatDateTime = (date) => {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formatter.format(new Date(date));
};

const formatDatePTBR = (date) => {
  const formatDate = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatDate.format(new Date(date));
};

function formatCpf(cpf) {
  cpf = cpf.replace(/\D/g, "");

  cpf = cpf.padStart(11, "0");

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const cpfNoFormat = "11144477711";
console.log(formatCpf(cpfNoFormat));

export { formatDateTime, formatDatePTBR, formatCpf };
