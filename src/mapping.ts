import {
    Fill as FillEvent,
    Cancel as CancelEvent,
    SignatureValidatorApproval,
    Fill__Params,
} from './types/ExchangeV2/ExchangeV2';
import { Order, User, CancelledOrder, Fill, Transaction } from './types/schema';
import { Bytes } from '@graphprotocol/graph-ts';

function _findOrCreateUser(addressHex: string): User {
    let user = User.load(addressHex);
    if (user == null) {
        user = new User(addressHex);
        user.save();
    }
    return user as User;
}

function _findOrCreateOrder(params: Fill__Params): Order {
    let id = params.orderHash.toHex();
    let order = Order.load(id);
    if (order == null) {
        order = new Order(id);
        order.maker = params.makerAddress;
        order.feeRecipient = params.feeRecipientAddress;
        order.makerAssetData = params.makerAssetData;
        order.takerAssetData = params.takerAssetData;
        order.createdAt = params._event.block.number;
        order.save();
    }
    return order as Order;
}

function _createTransaction(event: FillEvent): Transaction {
    let id = event.transaction.hash.toHex();
    let transaction = new Transaction(id);
    transaction.from = event.transaction.from;
    transaction.gasUsed = event.transaction.gasUsed;
    transaction.gasPrice = event.transaction.gasPrice;
    transaction.to = event.transaction.to as Bytes;
    transaction.blockNumber = event.block.number;
    transaction.save();
    return transaction as Transaction;
}

function _createFill(event: FillEvent, order: Order): Fill {
    let id = event.params.orderHash
        .toHex()
        .concat('-')
        .concat(event.transaction.hash.toHex())
        .concat('-')
        .concat(event.logIndex.toString());
    let fill = new Fill(id);
    let params = event.params;
    fill.orderHash = params.orderHash;
    fill.maker = params.makerAddress;
    fill.taker = params.takerAddress;
    fill.makerAssetFilledAmount = params.makerAssetFilledAmount;
    fill.takerAssetFilledAmount = params.takerAssetFilledAmount;
    fill.sender = params.senderAddress;
    fill.makerFeePaid = params.makerFeePaid;
    fill.takerFeePaid = params.takerFeePaid;
    fill.order = order.id;
    fill.transaction = event.transaction.hash.toHex();
    fill.transactionHash = event.transaction.hash;
    fill.createdAt = event.block.number;
    fill.save();
    return fill;
}

export function handleFill(event: FillEvent): void {
    let maker = _findOrCreateUser(event.params.makerAddress.toHex());
    let taker = _findOrCreateUser(event.params.takerAddress.toHex());
    let feeRecipient = _findOrCreateUser(event.params.feeRecipientAddress.toHex());
    let order = _findOrCreateOrder(event.params);
    let fill = _createFill(event, order);
    let transaction = _createTransaction(event);
}

export function handleCancel(event: CancelEvent): void {
    let id = event.params.orderHash.toHex();
}
