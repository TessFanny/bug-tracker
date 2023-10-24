export function formatDate() {
  //   const dateString = "2023-10-24T09:16:44.483Z";
  //   const timestamp = Date.parse(dateString);

  //     const dateObj = new Date(timestamp);

  //     const day = dateObj.getDate().toString().padStart(2, "0");
  //     const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  //     const year = dateObj.getFullYear();
  //     const hours = dateObj.getHours().toString().padStart(2, "0");
  //     const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  //     const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  //     const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  //   return formattedDate

  const timestamp = Date.now(); // Obtenez le timestamp UNIX actuel en millisecondes

  const date = new Date(timestamp); // Créez un objet Date à partir du timestamp

  // Formatez la date en chaîne de caractères lisible
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = date.toLocaleString(undefined, options);
  return formattedDate;
}

export function formatCreateDate(date) {
  // Analyse de la date d'origine en tant qu'objet Date
  const originalDate = new Date(date);

  // Fonction pour obtenir le nom du mois à partir de son numéro (0-11)
  const getMonthName = (month) => {
    const monthNames = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    return monthNames[month];
  };

  // Obtenir les composants de date
  const day = originalDate.getDate();
  const month = getMonthName(originalDate.getMonth());
  const year = originalDate.getFullYear();
  const hours = originalDate.getHours().toString().padStart(2, "0");
  const minutes = originalDate.getMinutes().toString().padStart(2, "0");
  const seconds = originalDate.getSeconds().toString().padStart(2, "0");

  // Format final
  const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate
}
