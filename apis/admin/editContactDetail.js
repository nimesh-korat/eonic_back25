const connectDB = require("../../db/dbConnect");
const { ObjectId } = require("mongodb");

async function EditContactDetail(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('contactDetail');

        const userId = req.session.user;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" });
        }

        const { address, email, phone } = req.body;

        const existingContactDetail = await collection.findOne({ _id: ObjectId.createFromHexString('6602bd7ad7211cfdd7fc0156') });

        if (!existingContactDetail) {
            return res.status(404).json({ success: false, message: "Contact Detail not found!" });
        }

        const updatedContactDetail = {
            address: address || existingContactDetail.address,
            email: email || existingContactDetail.email,
            phone: phone || existingContactDetail.phone,
        };

        await collection.updateOne({ _id: ObjectId.createFromHexString('6602bd7ad7211cfdd7fc0156') }, { $set: updatedContactDetail });

        return res.status(200).json({ success: true, message: "Contact Detail updated successfully" });
    } catch (error) {
        console.error("EditContactDetail.js: ", error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = { EditContactDetail };
