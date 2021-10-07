import { Response, Request } from 'express'
import { IBalance } from './../../types/balance'
import Balance from '../../models/balance'

const getAmount = async (req: Request, res: Response): Promise<void> => {
    try{
        let getBal: IBalance | null = await Balance.findOne(
            {'address': req.params.addr}
        )
        if(!getBal) {
            getBal = new Balance({
                address: req.params.addr,
                amount: 0,
                status: false,
            });
            const newTodo: IBalance = await getBal.save()
        }
        res.status(200).json({
            message: 'Balance deleted',
            balance: getBal,
        })
    } catch (error){
        throw error;
    }
}

const updateAmount = async(req: Request, res: Response): Promise<void> => {
    try {
        const updatedBal: IBalance | null = await Balance.findOneAndUpdate(
            { 'address': req.params.addr },
            {address: req.params.addr, amount: req.body.amount, status:false}
        );
        res.status(201).json({
            message: 'Balance updated',
            balance: updatedBal,
        })
    }
    catch (error){
        throw(error);
    }
}

export { getAmount, updateAmount }
