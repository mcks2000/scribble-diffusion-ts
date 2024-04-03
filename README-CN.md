这是一个使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 引导的 [Next.js](https://nextjs.org/)  项目。

## 开始

首先，运行开发服务器：

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
用浏览器打开 [http://localhost:3000](http://localhost:3000) 查看结果。

你可以通过修改 `app/page.tsx` 开始编辑页面。页面会在你编辑文件时自动更新。

本项目使用 [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) 自动优化和加载 Inter（一种自定义 Google 字体）。


## 了解更多

要了解有关 Next.js 的更多信息，请查看以下资源：



- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 功能和 API
- [学习 Next.js](https://nextjs.org/learn) - 互动式 Next.js 教程

您可以查看 [Next.js GitHub](https://github.com/vercel/next.js/) 代码库，欢迎您提供反馈和意见！


## 在 Vercel 上部署

部署 Next.js 应用程序的最简单方法是使用 Next.js 创建者提供的 [Vercel 平台]（https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme）。


详情请查看我们的 [Next.js 部署文档](https://nextjs.org/docs/deployment) 。


## TODO
- 优化获取，轮训
- 允许上传图片并显示
- 获取的数据存到数据库 ，请求参数 http://localhost:3001/api/predictions/rgeklgtbs5o662tflqjcbctfxi
  ```text
   {
  id: 'vd5xbodbg5v3gtuo6azckwmbxa',
  model: 'jagilley/controlnet-scribble',
  version: '435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117',
  input: {
    image: 'https://upcdn.io/12a1yt2/raw/uploads/scribble-diffusion-ts/1.0.0/2024-03-28/scribble_input_5YvWNPxH.png',
    prompt: 'a goofy owl',
    replicate_api_token: 'r8_8ZFxujfKMFjs4wXfDsUwIA9Hz66ONLU3YFTr0',
    structure: 'scribble'
  },
  logs: 'Global seed set to 5046\n' +
    'Data shape for DDIM sampling is (1, 4, 64, 64), eta 0.0\n' +
    'Running DDIM Sampling with 20 timesteps\n' +
    'DDIM Sampler:   0%|          | 0/20 [00:00<?, ?it/s]\n' +
    'DDIM Sampler:   5%|▌         | 1/20 [00:00<00:02,  6.75it/s]\n' +
    'DDIM Sampler:  10%|█         | 2/20 [00:00<00:02,  6.76it/s]\n' +
    'DDIM Sampler:  15%|█▌        | 3/20 [00:00<00:02,  6.76it/s]\n' +
    'DDIM Sampler:  20%|██        | 4/20 [00:00<00:02,  6.76it/s]\n' +
    'DDIM Sampler:  25%|██▌       | 5/20 [00:00<00:02,  6.76it/s]\n' +
    'DDIM Sampler:  30%|███       | 6/20 [00:00<00:02,  6.76it/s]\n' +
    'DDIM Sampler:  35%|███▌      | 7/20 [00:01<00:01,  6.75it/s]\n' +
    'DDIM Sampler:  40%|████      | 8/20 [00:01<00:01,  6.75it/s]\n' +
    'DDIM Sampler:  45%|████▌     | 9/20 [00:01<00:01,  6.76it/s]\n' +
    'DDIM Sampler:  50%|█████     | 10/20 [00:01<00:01,  6.76it/s]\n' +
    'DDIM Sampler:  55%|█████▌    | 11/20 [00:01<00:01,  6.76it/s]\n' +
    'DDIM Sampler:  60%|██████    | 12/20 [00:01<00:01,  6.76it/s]\n' +
    'DDIM Sampler:  65%|██████▌   | 13/20 [00:01<00:01,  6.76it/s]\n' +
    'DDIM Sampler:  70%|███████   | 14/20 [00:02<00:00,  6.75it/s]\n' +
    'DDIM Sampler:  75%|███████▌  | 15/20 [00:02<00:00,  6.76it/s]\n' +
    'DDIM Sampler:  80%|████████  | 16/20 [00:02<00:00,  6.76it/s]\n' +
    'DDIM Sampler:  85%|████████▌ | 17/20 [00:02<00:00,  6.76it/s]\n' +
    'DDIM Sampler:  90%|█████████ | 18/20 [00:02<00:00,  6.76it/s]\n' +
    'DDIM Sampler:  95%|█████████▌| 19/20 [00:02<00:00,  6.76it/s]\n' +
    'DDIM Sampler: 100%|██████████| 20/20 [00:02<00:00,  6.76it/s]\n' +
    'DDIM Sampler: 100%|██████████| 20/20 [00:02<00:00,  6.76it/s]\n',
  output: [
    'https://replicate.delivery/pbxt/ffiBstqIw9rYiUVliFPejbBesfWHlKaYM9YaYVAKYdoowolUC/output_0.png',
    'https://replicate.delivery/pbxt/bunRfeKUqIqLwUrJzb8oG2qxMY6tWnUpaLgCuKIrEeeWY0SKB/output_1.png'
  ],
  error: null,
  status: 'succeeded',
  created_at: '2024-03-28T07:42:52.163874Z',
  started_at: '2024-03-28T07:42:57.746954Z',
  completed_at: '2024-03-28T07:43:01.801466Z',
  webhook: 'http://localhost:3000/api/replicate-webhook',
  webhook_events_filter: [ 'start', 'completed' ],
  urls: {
    cancel: 'https://api.replicate.com/v1/predictions/vd5xbodbg5v3gtuo6azckwmbxa/cancel',
    get: 'https://api.replicate.com/v1/predictions/vd5xbodbg5v3gtuo6azckwmbxa'
  },
  metrics: { predict_time: 4.054512 }
}
  ```
