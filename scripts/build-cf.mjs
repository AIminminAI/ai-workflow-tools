// Cloudflare Pages 构建脚本
// 静态导出模式：设置 output:export → 构建 → 恢复配置
// Cloudflare Pages 部署纯静态文件，国内访问快
// AI 匹配器使用内置静态引擎，所有功能正常

import fs from "fs";
import { execSync } from "child_process";

const CONFIG_PATH = "next.config.ts";
const API_DIR = "app/api";
const API_BAK = "app/_api_bak";

const originalConfig = fs.readFileSync(CONFIG_PATH, "utf8");

try {
  // 1. 临时移除 API 路由（output:export 不支持 API Routes）
  if (fs.existsSync(API_DIR)) {
    fs.renameSync(API_DIR, API_BAK);
    console.log("✓ 已临时移除 API 路由");
  }

  // 2. 清除 .next 缓存（旧的类型验证器会引用已移除的 API 路由）
  fs.rmSync(".next", { recursive: true, force: true });
  console.log("✓ 已清除 .next 缓存");

  // 3. 修改 next.config.ts 添加 output: 'export'
  const modifiedConfig = originalConfig.replace(
    "/* config options here */",
    "output: 'export' as const,"
  );
  fs.writeFileSync(CONFIG_PATH, modifiedConfig);
  console.log("✓ 已设置 output: export");

  // 4. 构建
  console.log("▶ 开始构建...");
  execSync("next build", { stdio: "inherit" });
  console.log("✓ 构建完成，静态文件输出到 out/ 目录");
} catch (error) {
  console.error("✗ 构建失败:", error.message);
  process.exitCode = 1;
} finally {
  // 4. 恢复原始配置和 API 路由
  fs.writeFileSync(CONFIG_PATH, originalConfig);
  if (fs.existsSync(API_BAK)) {
    fs.renameSync(API_BAK, API_DIR);
    console.log("✓ 已恢复 API 路由和配置");
  }
}
