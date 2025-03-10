import { ethers, providers as Providers } from 'ethers'
import { toChecksumAddress } from 'web3-utils'
import env from '@/environment'
import { getPreferredChain } from '@/local-settings'
import { getNetwork } from '@/networks'

const DEFAULT_LOCAL_CHAIN = ''

function getBackendServicesKeys() {
  return {
    alchemy: env('ALCHEMY_API_KEY'),
    etherscan: env('ETHERSCAN_API_KEY'),
    infura: env('INFURA_API_KEY'),
    pocket: env('POCKET_API_KEY'),
  }
}

export function getDefaultProvider(chainId = getPreferredChain()) {
  const { defaultEthNode, type } = getNetwork(chainId)

  return defaultEthNode
    ? new Providers.StaticJsonRpcProvider(defaultEthNode)
    : ethers.getDefaultProvider(type, getBackendServicesKeys())
}

export function encodeFunctionData(contract, functionName, params) {
  return contract.interface.encodeFunctionData(functionName, params)
}

export function getNetworkType(chainId = getPreferredChain()) {
  chainId = String(chainId)

  if (chainId === '1') return 'mainnet'
  if (chainId === '4') return 'rinkeby'
  if (chainId === '100') return 'xdai'
  if (chainId === '137') return 'polygon'

  return DEFAULT_LOCAL_CHAIN
}

export function getNetworkName(chainId = getPreferredChain()) {
  chainId = String(chainId)

  if (chainId === '1') return 'Mainnet'
  if (chainId === '4') return 'Rinkeby'
  if (chainId === '100') return 'xDai'
  if (chainId === '137') return 'Polygon'

  return 'unknown'
}

export function isLocalOrUnknownNetwork(chainId = getPreferredChain()) {
  return getNetworkType(chainId) === DEFAULT_LOCAL_CHAIN
}

// Check address equality with checksums
export function addressesEqual(first, second) {
  first = first && toChecksumAddress(first)
  second = second && toChecksumAddress(second)
  return first === second
}

export const addressPattern = '(0x)?[0-9a-fA-F]{40}'
const ETH_ADDRESS_SPLIT_REGEX = /(0x[a-fA-F0-9]{40}(?:\b|\.|,|\?|!|;))/g
const ETH_ADDRESS_TEST_REGEX = /(0x[a-fA-F0-9]{40}(?:\b|\.|,|\?|!|;))/g

export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'

// Detect Ethereum addresses in a string and transform each part.
//
// `callback` is called on every part with two params:
//   - The string of the current part.
//   - A boolean indicating if it is an address.
//
export function transformAddresses(str, callback) {
  return str
    .split(ETH_ADDRESS_SPLIT_REGEX)
    .map((part, index) =>
      callback(part, ETH_ADDRESS_TEST_REGEX.test(part), index)
    )
}

export function addressesEqualNoSum(first, second) {
  first = first && first.toLowerCase()
  second = second && second.toLowerCase()
  return first === second
}

// Re-export some web3-utils functions
export {
  asciiToHex,
  hexToUtf8,
  isAddress,
  toChecksumAddress,
  toHex,
  soliditySha3,
} from 'web3-utils'
