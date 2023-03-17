 // Import de la library de journalisation
const winston = require('winston');
const path = require('path')
const url = require('url')

//const dirname = url.fileURLToPath(new URL('.', import.meta.url))
const dirname = path.dirname(require.main.filename);
const errorLogsDir = path.join(dirname, '../logs/errorlogs');
const adminLogsDir = path.join(dirname, '../logs/adminlogs');
const { createLogger, transports, format } = winston;


// Je prépare mes variables date afin que le fichier de log soit Ã  la date du jour.
const date = new Date();
const year = date.getUTCFullYear();
let month = date.getUTCMonth() + 1;
if (month < 10) {
    month = "0" + month;
    }
let day = date.getUTCDate();
    if (day < 10) {
        day = "0" + day;
    }

// Nom du fichier des logs erreurs
const errorFileName = `${year}-${month}-${day}-errorlog.log`

// Nom du fichier des logs admin
const adminFileName = `${year}-${month}-${day}-adminlog.log`


// Permet l'écriture d'un fichier .log pour les erreurs
const errorLog = createLogger({

    transports: [
        new transports.File({
            filename: path.join(errorLogsDir, errorFileName),
            level: 'error',
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss'}),
                format.printf(( { level, message, timestamp, url, method }) => {
                    return `Date:[${timestamp}] [${level.toUpperCase()}] Methode: [${method}] Route:[${url} ${message}]`;
                })
            )
        })

    ]
});
console.log(errorLog.error);

// Permet l'écriture d'un fichier .log pour un suivi des POST, PATCH et DELETE d'un membre du staff ou d'un admin
const adminLog = createLogger({

    transports: [
        new transports.File({
            filename: path.join(adminLogsDir, adminFileName),
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss'}),
                format.printf(( { level, message, timestamp, url, method, user, role }) => {
                    return `Date:[${timestamp}] [${level.toUpperCase()}] Methode: [${method}] [ Route:${url} ] [ User: ${user} ] [ Role: ${role} ] [ Action: ${message} ]`;
                })
            )
        })
    ]
});

module.exports = { errorLog, adminLog }; 