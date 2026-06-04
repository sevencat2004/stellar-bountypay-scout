# SCF 提交清单

这个文件给提交人使用。可以把英文内容从 `docs/SUBMISSION_COPY_PACKET.md` 复制到 SCF 表单里。

## 注册入口

SCF 官网：

```text
https://communityfund.stellar.org
```

Awards 页面：

```text
https://communityfund.stellar.org/awards
```

## 项目资料

项目名称：

```text
Stellar BountyPay Scout
```

GitHub 仓库：

```text
https://github.com/sevencat2004/stellar-bountypay-scout
```

本地演示地址：

```text
http://localhost:8791
```

建议申请金额：

```text
25,000 XLM
```

## 需要你自己填写的内容

- 提交人姓名
- 邮箱
- 国家或地区
- 公开 Stellar 钱包地址
- SCF 账号资料
- 如果平台要求，完成 KYC、税务或 award paperwork

## 不要填写或发送的内容

- 私钥
- 助记词
- seed phrase
- recovery phrase
- 钱包备份文件

SCF 表单和项目仓库只需要公开钱包地址，不需要任何私密材料。

## 建议提交顺序

1. 注册或登录 SCF。
2. 进入 Awards / SCF #44 相关提交入口。
3. 选择 Build Award 相关路径。
4. 填写项目名称、GitHub 仓库、项目简介和里程碑。
5. 填写公开 Stellar 钱包地址。
6. 检查申请金额为 `25,000 XLM`，或按表单实际限制微调。
7. 提交前把截图或字段发给 Codex 复核。

## 本地验证命令

在 `D:\coin\stellar-bountypay-scout` 运行：

```powershell
npm.cmd run preflight
```

预期结果：

```text
All SCF preflight checks passed.
```

## Stellar 钱包地址

如果你还没有 Stellar 钱包地址，先看：

```text
docs/STELLAR_WALLET_SETUP.zh-CN.md
```

SCF 后续只需要公开的 `G...` 钱包地址。不要填写或发送 `S...` secret key、助记词、恢复短语、私钥或钱包备份文件。
