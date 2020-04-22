function verifyToken(req) {
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(process.env.CLIENT_ID);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idtoken,
            // CLIENT_ID that accesses backend
            audience: process.env.CLIENT_ID,
        });

      const payload = ticket.getPayload();
      const userid = payload['sub'];

      return ticket;
    }

	// Return promise
	return verify();
};

module.exports = verifyToken;
