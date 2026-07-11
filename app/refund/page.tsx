import type { Metadata } from "next";
import { LegalPage, Section } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "打赏说明 - AI Match Wizard",
  description: "AI Match Wizard 打赏说明与自愿支持政策",
};

export default function RefundPage() {
  return (
    <LegalPage title="打赏说明" lastUpdated="2026年7月3日">
      <Section title="一、内容完全免费">
        <p>
          AI Match Wizard 提供的所有内容（包括 AI 工具匹配、实战配方、实战 Prompt 模板、配套工具链接）<strong>完全免费</strong>，无需任何付费即可查看和使用全部内容。
        </p>
        <p>
          我们致力于让每个人都能免费获得优质的 AI 工具使用指导，降低 AI 使用门槛。
        </p>
      </Section>

      <Section title="二、关于打赏">
        <p>
          本站在页面底部提供微信和支付宝打赏二维码。<strong>打赏完全自愿</strong>，不打赏也能使用全部功能、查看全部内容。
        </p>
        <p>打赏的性质为"赠予"（用户自愿向创作者表达感谢的资金赠与），不构成商品或服务的购买行为。</p>
        <p>打赏金额由用户自行决定，本站不做任何强制要求或暗示。</p>
      </Section>

      <Section title="三、打赏的接收方式">
        <p>
          打赏通过用户扫描页面展示的微信或支付宝个人收款码直接完成，资金由支付平台（微信支付/支付宝）直接转入创作者个人账户，本站不接触、不存储、不处理任何支付数据。
        </p>
        <p>本站不使用任何第三方收款平台，不涉及平台抽成，您打赏的每一分钱都直接到达创作者手中。</p>
      </Section>

      <Section title="四、打赏后的说明">
        <p>1. 打赏后您不会获得任何额外权益或服务——所有内容本来就免费开放。</p>
        <p>2. 打赏是出于您对内容的认可和鼓励，不构成交易行为。</p>
        <p>3. 打赏后创作者会更积极地更新更多优质配方，这是对创作者最大的精神支持。</p>
      </Section>

      <Section title="五、关于退款">
        <p>
          鉴于打赏属于<strong>自愿赠予行为</strong>，且打赏前您已能查看全部免费内容（不存在"付款后才发现内容不符"的情况），原则上打赏后不予退还。
        </p>
        <p>
          但如果您是误操作（如误扫大额码、重复扫描等），请通过微信联系客服说明情况，我们会在核实后原路退回。
        </p>
      </Section>

      <Section title="六、联系方式">
        <p>微信：15902953075</p>
        <p>邮箱：1317957931@qq.com</p>
        <p>客服响应时间：每日 9:00-22:00</p>
      </Section>
    </LegalPage>
  );
}
