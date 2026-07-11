import type { Metadata } from "next";
import { LegalPage, Section } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "隐私政策 - AI Match Wizard",
  description: "AI Match Wizard 隐私政策与数据保护说明",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="隐私政策" lastUpdated="2026年7月3日">
      <Section title="一、前言">
        <p>
          AI Match Wizard（以下简称"本站"）高度重视用户隐私保护。本隐私政策旨在说明本站如何收集、使用和保护您的个人信息。请您在使用本站服务前，仔细阅读并充分理解本政策的全部内容。
        </p>
      </Section>

      <Section title="二、本站收集的信息">
        <p>
          本站是一个纯前端单页应用，<strong>不使用任何后端服务器、不使用任何数据库</strong>。因此，本站不会主动收集您的以下信息：
        </p>
        <p>· 姓名、身份证号、手机号等个人身份信息</p>
        <p>· 银行卡、支付宝、微信等支付账户信息</p>
        <p>· 浏览记录、IP 地址、设备信息</p>
        <p>
          本站所有内容完全免费，无需注册、无需登录、无需解锁，因此本站<strong>不存储任何用户数据</strong>。
        </p>
      </Section>

      <Section title="三、关于打赏">
        <p>
          本站所有内容完全免费。页面底部提供微信和支付宝个人收款码供用户自愿打赏。<strong>打赏完全自愿，不打赏也能使用全部功能</strong>。
        </p>
        <p>
          打赏时，您直接通过微信支付或支付宝扫描个人收款码完成，资金由支付平台直接转入创作者个人账户，本站不接触、不存储、不处理任何支付数据。您的支付信息由微信/支付宝按照其隐私政策处理。
        </p>
      </Section>

      <Section title="四、Cookie 与本地存储">
        <p>
          本站不使用 Cookie，不使用 localStorage 或 sessionStorage。本站是一个纯静态网站，不会在您的浏览器中存储任何数据。
        </p>
      </Section>

      <Section title="五、信息安全">
        <p>
          1. 本站所有内容完全免费公开，不涉及敏感数据存储，不存在信息被窃取的风险。
        </p>
        <p>2. 本站部署于 Vercel / Cloudflare 平台，自动启用 HTTPS 加密传输，保障访问安全。</p>
        <p>3. 尽管本站采取了合理的安全措施，但无法保证 100% 的安全性。因不可抗力或技术局限导致的服务中断，本站不承担责任。</p>
      </Section>

      <Section title="六、未成年人保护">
        <p>
          本站服务面向成年人。未成年人应在监护人陪同下使用本站服务，并在监护人指导下进行支付操作。
        </p>
      </Section>

      <Section title="七、政策更新">
        <p>
          本站保留随时修改本隐私政策的权利。政策更新后，将在本页面公示并更新"最后更新"日期。继续使用本站服务即视为您同意更新后的隐私政策。
        </p>
      </Section>

      <Section title="八、联系方式">
        <p>如对本隐私政策有任何疑问，请通过以下方式联系：</p>
        <p>微信：15902953075</p>
        <p>邮箱：1317957931@qq.com</p>
      </Section>
    </LegalPage>
  );
}
