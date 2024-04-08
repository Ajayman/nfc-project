import {initMongoose} from "app/lib/mongoose"
import About from "app/model/About"

export default async function handle(req, res){
    await initMongoose();
    res.json(await About.find().exec())
}