import type { Metadata } from "next";
import { LegalPage, Section } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "退款政策 - AI Recipe Shop",
  description: "AI Recipe Shop 退款政策与售后说明",
};

export default function RefundPage() {
  return (
    <LegalPage title="退款政策" lastUpdated="2026年6月17日">
      <Section title="一、商品性质说明">
        <p>
          本站提供的商品为<strong>虚拟数字商品</strong>（AI 工作流配方、Prompt 模板、隐藏工具链接），属于即时交付、可立即复制使用的数字化内容。根据《中华人民共和国消费者权益保护法》第二十五条规定，数字化商品不适用七日无理由退货。
        </p>
      </Section>

      <Section title="二、退款条件">
        <p>
          鉴于数字商品的特殊性，本站实行<strong>激活码一经使用、概不退款</strong>的原则。但在以下特殊情况下，本站支持全额退款：
        </p>
        <p>1. 激活码无法正常使用（经技术验证确认是本站系统问题）。</p>
        <p>2. 付款成功但未收到激活码（需提供付款截图凭证）。</p>
        <p>3. 重复付款（同一配方被多次购买）。</p>
        <p>4. 因本站原因导致配方内容与描述严重不符。</p>
      </Section>

      <Section title="三、不予退款情形">
        <p>以下情况不支持退款：</p>
        <p>1. 激活码已成功输入并解锁配方内容。</p>
        <p>2. 因个人操作失误导致的重复购买（请联系客服协商）。</p>
        <p>3. 以"不需要了""买错了"等个人原因为由申请退款。</p>
        <p>4. 通过技术手段绕过付费验证后被发现查处的。</p>
      </Section>

      <Section title="四、退款流程">
        <p>1. 请通过微信（phone_15902953075）联系客服，说明退款原因。</p>
        <p>2. 提供付款截图、付款平台（面包多/爱发电）、付款时间等信息。</p>
        <p>3. 客服将在 24 小时内核实情况并回复处理结果。</p>
        <p>4. 退款将原路退回至您的付款账户，到账时间取决于支付平台（通常 1-3 个工作日）。</p>
      </Section>

      <Section title="五、售后承诺">
        <p>1. 本站承诺所有配方内容真实有效，如发现内容为空或无法查看，将免费补发或全额退款。</p>
        <p>2. 本站将持续更新配方内容，已解锁的用户可免费享受内容更新。</p>
        <p>3. 如您在使用过程中遇到任何问题，欢迎随时联系客服，我们将竭诚为您服务。</p>
      </Section>

      <Section title="六、联系方式">
        <p>微信：phone_15902953075</p>
        <p>邮箱：1317957931@qq.com</p>
        <p>客服响应时间：每日 9:00-22:00</p>
      </Section>
    </LegalPage>
  );
}
