// web3的index.d.ts有问题
// 参考：https://github.com/ethereum/web3.js/issues/2363
// 参考：https://github.com/ethereum/web3.js/issues/1597
import * as Web3Module from 'web3';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3: typeof Web3Module.default = require('web3');

export default Web3;
