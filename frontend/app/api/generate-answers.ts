import type { NextApiRequest, NextApiResponse } from 'next';
// import Task from '../../../server/model/task';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // try{
        // const tasks = await Task.find();
        res.status(200).json({ tasks: [] });
        // } catch (error) {
        //      console.error("Error fetching tasks:", error);
        //     res.status(500).json({ error: "Error fetching tasks" });
        // }
    }else{
        res.status(405).json({ error: "Method not allowed" });
    }
}

