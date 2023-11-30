import { Locator, Page, expect } from "src/oss/fixtures";
import { EventUtils } from "src/shared/event-utils";
import { SelectorPom } from "../selector";

export class HistogramPom {
  readonly assert: HistogramAsserter;
  readonly locator: Locator;
  readonly bars: Locator;
  readonly selector: SelectorPom;

  constructor(
    private readonly page: Page,
    private readonly eventUtils: EventUtils
  ) {
    this.assert = new HistogramAsserter(this);

    this.locator = this.page.getByTestId("histograms-container");
    this.selector = new SelectorPom(this.locator, eventUtils, "histograms");
  }

  bar(nth: number) {
    return this.page.locator('[class="recharts-rectangle"]').nth(nth);
  }

  async barTooltipText(nth: number) {
    await this.bar(nth).hover();
    await this.page.locator(".recharts-tooltip-wrapper").waitFor();

    const tooltip = this.page.locator(".recharts-tooltip-wrapper").first();
    return await tooltip.innerText();
  }

  async selectField(field: string) {
    const promise = this.eventUtils.getEventReceivedPromiseForPredicate(
      `histogram-${field}`,
      () => true
    );
    await this.selector.selectResult(field);
    await promise;
  }
}

class HistogramAsserter {
  constructor(private readonly histogramPom: HistogramPom) {}

  async isLoaded() {
    await expect(this.histogramPom.locator).toBeVisible();
  }

  async verifyField(field: string) {
    await this.histogramPom.selector.assert.verifyValue(field);
  }

  async verifyFields(fields: string[]) {
    await this.histogramPom.selector.assert.verifyResults(fields);
  }
}
