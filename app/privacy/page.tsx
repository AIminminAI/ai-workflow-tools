import type { Metadata } from "next";
import { LegalPage, Section } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "隐私政策 - AI Match Wizard",
  description: "AI Match Wizard 隐私政策与数据保护说明",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="隐私政策" lastUpdated="2026年6月17日">
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
          本站唯一存储的数据是您已解锁配方的 ID 列表，保存在您浏览器的 localStorage 中（键名：unlocked_recipes），用于在您刷新页面或再次访问时恢复已解锁状态。该数据仅存储在您的本地设备上，不会上传至任何服务器。
        </p>
      </Section>

      <Section title="三、第三方服务">
        <p>
          本站的支付环节通过第三方平台（面包多 mianbaoduo.com / 爱发电 afdian.com）完成。当您扫描二维码进行支付时，您将跳转至第三方平台，您的支付信息由对应平台按照其隐私政策进行处理，本站不会接触您的任何支付数据。
        </p>
        <p>
          各第三方平台的隐私政策请参阅：
        </p>
        <p>· 面包多：https://mianbaoduo.com</p>
        <p>· 爱发电：https://afdian.com</p>
      </Section>

      <Section title="四、Cookie 与本地存储">
        <p>
          本站不使用 Cookie。本站使用浏览器的 localStorage 技术存储您的解锁状态，以便您下次访问时无需重新输入激活码。该数据仅存储在您的本地浏览器中，不会发送至任何服务器。
        </p>
        <p>
          您可以随时通过浏览器设置清除本地存储数据，清除后已解锁的配方将需要重新输入激活码。
        </p>
      </Section>

      <Section title="五、信息安全">
        <p>
          1. 本站的核心配方内容使用 Base64 编码存储，激活码使用 SHA-256 哈希加密，防止信息被轻易窃取。
        </p>
        <p>2. 本站部署于 Vercel 平台，自动启用 HTTPS 加密传输，保障数据传输安全。</p>
        <p>3. 尽管本站采取了合理的安全措施，但无法保证 100% 的安全性。因不可抗力或技术局限导致的信息泄露，本站不承担责任。</p>
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
        <p>微信：phone_15902953075</p>
        <p>邮箱：1317957931@qq.com</p>
      </Section>
    </LegalPage>
  );
}
