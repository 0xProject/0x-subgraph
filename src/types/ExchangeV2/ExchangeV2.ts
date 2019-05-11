import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class SignatureValidatorApproval extends EthereumEvent {
  get params(): SignatureValidatorApproval__Params {
    return new SignatureValidatorApproval__Params(this);
  }
}

export class SignatureValidatorApproval__Params {
  _event: SignatureValidatorApproval;

  constructor(event: SignatureValidatorApproval) {
    this._event = event;
  }

  get signerAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get validatorAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class Fill extends EthereumEvent {
  get params(): Fill__Params {
    return new Fill__Params(this);
  }
}

export class Fill__Params {
  _event: Fill;

  constructor(event: Fill) {
    this._event = event;
  }

  get makerAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get feeRecipientAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get takerAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get senderAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get makerAssetFilledAmount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get takerAssetFilledAmount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get makerFeePaid(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get takerFeePaid(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }

  get orderHash(): Bytes {
    return this._event.parameters[8].value.toBytes();
  }

  get makerAssetData(): Bytes {
    return this._event.parameters[9].value.toBytes();
  }

  get takerAssetData(): Bytes {
    return this._event.parameters[10].value.toBytes();
  }
}

export class Cancel extends EthereumEvent {
  get params(): Cancel__Params {
    return new Cancel__Params(this);
  }
}

export class Cancel__Params {
  _event: Cancel;

  constructor(event: Cancel) {
    this._event = event;
  }

  get makerAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get feeRecipientAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get senderAddress(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get orderHash(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }

  get makerAssetData(): Bytes {
    return this._event.parameters[4].value.toBytes();
  }

  get takerAssetData(): Bytes {
    return this._event.parameters[5].value.toBytes();
  }
}

export class CancelUpTo extends EthereumEvent {
  get params(): CancelUpTo__Params {
    return new CancelUpTo__Params(this);
  }
}

export class CancelUpTo__Params {
  _event: CancelUpTo;

  constructor(event: CancelUpTo) {
    this._event = event;
  }

  get makerAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get senderAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get orderEpoch(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class AssetProxyRegistered extends EthereumEvent {
  get params(): AssetProxyRegistered__Params {
    return new AssetProxyRegistered__Params(this);
  }
}

export class AssetProxyRegistered__Params {
  _event: AssetProxyRegistered;

  constructor(event: AssetProxyRegistered) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get assetProxy(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ExchangeV2 extends SmartContract {
  static bind(address: Address): ExchangeV2 {
    return new ExchangeV2("ExchangeV2", address);
  }

  filled(param0: Bytes): BigInt {
    let result = super.call("filled", [EthereumValue.fromFixedBytes(param0)]);
    return result[0].toBigInt();
  }

  cancelled(param0: Bytes): boolean {
    let result = super.call("cancelled", [
      EthereumValue.fromFixedBytes(param0)
    ]);
    return result[0].toBoolean();
  }

  assetProxies(param0: Bytes): Address {
    let result = super.call("assetProxies", [
      EthereumValue.fromFixedBytes(param0)
    ]);
    return result[0].toAddress();
  }

  getAssetProxy(assetProxyId: Bytes): Address {
    let result = super.call("getAssetProxy", [
      EthereumValue.fromFixedBytes(assetProxyId)
    ]);
    return result[0].toAddress();
  }

  transactions(param0: Bytes): boolean {
    let result = super.call("transactions", [
      EthereumValue.fromFixedBytes(param0)
    ]);
    return result[0].toBoolean();
  }

  allowedValidators(param0: Address, param1: Address): boolean {
    let result = super.call("allowedValidators", [
      EthereumValue.fromAddress(param0),
      EthereumValue.fromAddress(param1)
    ]);
    return result[0].toBoolean();
  }

  preSigned(param0: Bytes, param1: Address): boolean {
    let result = super.call("preSigned", [
      EthereumValue.fromFixedBytes(param0),
      EthereumValue.fromAddress(param1)
    ]);
    return result[0].toBoolean();
  }

  owner(): Address {
    let result = super.call("owner", []);
    return result[0].toAddress();
  }

  isValidSignature(
    hash: Bytes,
    signerAddress: Address,
    signature: Bytes
  ): boolean {
    let result = super.call("isValidSignature", [
      EthereumValue.fromFixedBytes(hash),
      EthereumValue.fromAddress(signerAddress),
      EthereumValue.fromFixedBytes(signature)
    ]);
    return result[0].toBoolean();
  }

  orderEpoch(param0: Address, param1: Address): BigInt {
    let result = super.call("orderEpoch", [
      EthereumValue.fromAddress(param0),
      EthereumValue.fromAddress(param1)
    ]);
    return result[0].toBigInt();
  }

  ZRX_ASSET_DATA(): Bytes {
    let result = super.call("ZRX_ASSET_DATA", []);
    return result[0].toBytes();
  }

  EIP712_DOMAIN_HASH(): Bytes {
    let result = super.call("EIP712_DOMAIN_HASH", []);
    return result[0].toBytes();
  }

  currentContextAddress(): Address {
    let result = super.call("currentContextAddress", []);
    return result[0].toAddress();
  }

  VERSION(): string {
    let result = super.call("VERSION", []);
    return result[0].toString();
  }
}
