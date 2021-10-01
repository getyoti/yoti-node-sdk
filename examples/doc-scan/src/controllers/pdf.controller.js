const config = require("../../config");
const html_to_pdf = require("html-pdf-node");

const host = config.YOTI_APP_BASE_URL;

module.exports = async (req, res) => {
	const sessionId = req.query.sessionId;
	const url = host.concat("/success?sessionID=", sessionId);
	const options = {
		format: "A4",
		margin: { top: "50px", bottom: "50px", left: "50px", right: "50px" },
	};

	const file = {
		url: url,
	};
	try {
		html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
			res.setHeader("Content-type", "application/pdf");
			res.send(pdfBuffer);
		});
	} catch (error) {
		res.render("pages/error", { error });
	}
};
