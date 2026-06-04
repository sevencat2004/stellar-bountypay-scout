# Stellar 钱包地址准备指南

这份指南给 SCF 提交人使用。SCF 后续完整 Build Award 表单、award paperwork 或发款流程可能会要求一个公开 Stellar 钱包地址。

## 你需要准备什么

你需要的是主网 Stellar 公开地址，也叫 Account ID、Public key 或 wallet address。

它通常长这样：

```text
GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

只把这个 `G...` 地址提供给 SCF。

## 推荐入口

### 方案 A：LOBSTR

适合想用最简单网页/手机钱包流程的人。

入口：

```text
https://lobstr.co/
```

操作：

1. 打开 LOBSTR 官网。
2. 点击 `Get Started` 或 `Create Account`。
3. 用邮箱注册账号。
4. 开启 PIN、2FA 或页面提供的安全设置。
5. 进入钱包后找到 `Receive`、`Deposit` 或 `Stellar Lumens XLM`。
6. 复制 `G...` 开头的 Stellar 地址。

### 方案 B：Freighter

适合想使用 Stellar 官方生态开发者钱包、浏览器扩展或移动端钱包的人。

入口：

```text
https://freighter.app/
```

操作：

1. 打开 Freighter 官网。
2. 安装浏览器扩展，或使用 iOS / Android 版本。
3. 创建新钱包。
4. 离线保存恢复短语。
5. 在钱包里复制 `Public key` 或 `Account ID`，应该是 `G...` 开头。

## 不建议优先使用交易所充值地址

交易所 XLM 充值地址常常需要 memo。SCF 发奖、测试交易、白名单确认和项目归属流程可能不适合交易所充值地址。

除非 SCF 明确说可以使用交易所地址并支持 memo，否则优先使用你自己控制的钱包地址。

## 绝对不要分享的内容

不要把下面任何内容发给 SCF、GitHub、Codex、Discord 或任何陌生人：

- secret key
- private key
- seed phrase
- recovery phrase
- 助记词
- 私钥
- 钱包备份文件
- 任何 `S...` 开头的 Stellar secret key

公开地址 `G...` 可以分享；secret key `S...` 拥有账户控制权，不能分享。

## 提交前核对

在 SCF 表单或 award paperwork 里填写钱包前，确认：

- 地址以 `G` 开头。
- 地址来自你自己的 Stellar 钱包。
- 你没有填写 `S...` secret key。
- 你没有填写助记词、恢复短语或备份文件。
- 如果 SCF 做测试交易，按 SCF 邮件或 dashboard 指示核对测试金额。

如果不确定，把截图里涉及私钥/助记词的部分遮住，只保留公开 `G...` 地址区域，再让 Codex 帮你检查。
