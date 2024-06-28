import { Heading } from '@/components/atoms/Heading'
import { Paragraph } from '@/components/atoms/Paragraph'

export default function DocumentationPage() {
  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full flex-col gap-y-10 border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex flex-col items-start gap-4">
          <Heading variant="h2">Sniper Bot (Solana)</Heading>

          <div className="mt-12 flex flex-col gap-y-6">
            <Heading variant="h3">Overview</Heading>
            <Paragraph variant="p2" className="text-gray300">
              The Sniper Bot is designed for proactive trading on the Solana
              blockchain, enabling users to snipe new tokens efficiently.{' '}
              {"It's"}
              essential for users to provide their private key for a specific
              wallet containing both SOL (for transaction fees) and WSOL
              (Wrapped SOL, used for trades).
            </Paragraph>

            <Paragraph variant="p2" className="text-gray300">
              Direct Blockchain Interaction: Operates directly on the Solana
              blockchain for quick response times. Customizable Strategies:
              Allows detailed customization of buying and selling strategies to
              match user preferences.
            </Paragraph>
          </div>

          <div className="mt-12 flex flex-col gap-y-6">
            <Heading variant="h3">Setting Up</Heading>
            <Paragraph variant="p2" className="text-gray300">
              Wallet Setup: Use a new or separate wallet to operate the bot.
              Ensure it is funded with SOL for transaction fees and WSOL for
              trading.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              Gas Configuration: Adjust how much you are willing to spend on
              transaction fees.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              Bid Amount: Set your preferred amount for initial token purchases.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              Auto-Sell: Option to automatically sell tokens at a profit. Users
              can set the delay period after which the sale should execute.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              Snipe Targeting: The bot can be configured to target specific Mint
              addresses, pool addresses, or pool names, ensuring you never miss
              an opportunity.
            </Paragraph>
          </div>
        </div>
        <div className="mt-10 h-px w-full bg-gray500/10" />
        <div className="flex flex-col items-start gap-4">
          <Heading variant="h2">Time Sensitive Bot (CEX)</Heading>
          <div className="mt-12 flex flex-col gap-y-6">
            <Heading variant="h3">Overview</Heading>
            <Paragraph variant="p2" className="text-gray300">
              The Time Sensitive Bot is tailored for high-frequency trading
              across over 20 centralized exchanges. It employs a combination of
              scalping and arbitrage strategies to maximize profits by
              exploiting price differentials and quick market movements.
            </Paragraph>
          </div>

          <div className="mt-12 flex flex-col gap-y-6">
            <Heading variant="h3">Key Capabilities </Heading>
            <Paragraph variant="p2" className="text-gray300">
              Multi-Exchange Compatibility: Works across multiple major
              exchanges, enhancing the ability to capitalize on arbitrage
              opportunities.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              Scalping and Arbitrage: Automatically executes buy and sell orders
              to profit from small price movements and differences between
              exchanges.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              Notification System: Integrates with Telegram to send real-time
              alerts and updates about trading activities and system status.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              Auto-Sell: Option to automatically sell tokens at a profit. Users
              can set the delay period after which the sale should execute.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              Snipe Targeting: The bot can be configured to target specific Mint
              addresses, pool addresses, or pool names, ensuring you never miss
              an opportunity.
            </Paragraph>
          </div>

          <div className="mt-12 flex flex-col gap-y-6">
            <Heading variant="h3">Security Measures</Heading>
            <Paragraph variant="p2" className="text-gray300">
              API Key Protection: Uses state-of-the-art encryption and security
              protocols to ensure that your trading keys are always protected.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              Activity Monitoring: Continuous monitoring of trading activity to
              detect and respond to unusual behavior quickly.
            </Paragraph>
            <Paragraph variant="p2" className="text-gray300">
              These documents provide users with a clear understanding of how
              each bot operates, what is required to use them effectively, and
              how they can be customized to fit individual trading strategies
              and preferences.
            </Paragraph>
          </div>
        </div>
      </div>
    </main>
  )
}
