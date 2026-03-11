---
title: "UK Grid Live TRMNL Plugin"
date: 2026-03-01
---
## Visualising the UK Grid Mix on a TRMNL E-Ink Display

I wanted a low-power, "glanceable" way to see where the UK's electricity is coming 
from in real-time. Using a **TRMNL** display and the **National Grid ESO API**, I 
built a live dashboard.

## The Data Source

I'm polling the [Carbon Intensity API](https://carbonintensity.org.uk) which 
provides a breakdown of generation by fuel type (Wind, Nuclear, Gas, etc.).

**Settings:**
* **Method:** `GET`
* **URL:** `https://api.carbonintensity.org.uk`
* **Headers:** `Accept=application/json`, `User-Agent=Mozilla/5.0`

The API returns a JSON object. 
```json
{
  "data": {
    "generationmix": [
      { "fuel": "gas", "perc": 42.1 },
      { "fuel": "wind", "perc": 28.5 }
    ]
  }
}
```

## The Markup
To make the most of the e-ink screen, I use **Liquid** to sort the fuels by their 
percentage so the biggest contributors stay at the top.  This is done within a 
block of code that uses the TRMNL CSS Framework to create high-contrast bars that 
stretch across the screen.

{% raw %}
```liquid
<div class="view view--full p-4 flex--column" style="height: 100%;">
  <div class="header mb-4">
    <div class="title title--sm text--center">
      UK Grid Mix - Live Generation Data
    </div>
  </div>
  <div class="content">
    {% assign sorted_mix = data.generationmix | sort: 'perc' | reverse %}
    {% for item in sorted_mix %}
    <!-- ROW: Explicitly set to 100% width -->
    <div class="flex items-center mb-2" style="width: 100%; display: flex;">
      <!-- FUEL LABEL: Fixed width to keep things aligned -->
      <div class="text--strong" style="width: 75px; font-size: 16px; flex-shrink: 0;">
        {{ item.fuel | capitalize }}
      </div>
      <!-- BAR CONTAINER: flex: 1 and width: 100% force it to take all remaining space -->
      <div style="flex: 1; border: 2px solid white; height: 30px; padding: 1px; margin-right: 12px; position: relative;">
        <div style="background-color: gray; height: 100%; width: {{ item.perc }}%;"></div>
      </div>
      <!-- PERCENTAGE: Fixed width so it stays pinned to the right edge -->
      <div class="text--right text--strong" style="width: 50px; font-size: 14px; flex-shrink: 0;">
        {{ item.perc | round: 1 }}%
      </div>
    </div>
    {% endfor %}
  </div>
  <div class="footer mt-6 pt-2" style="border-top: 2px solid black;">
    <div class="flex justify--between items-center" style="width: 100%;">
      <span class="text--strong text--upper" style="font-size: 16px; font-weight: 900;">
        NESO LIVE &nbsp; | &nbsp; {{ "now" | date: "%H:%M" }} GMT &nbsp; | &nbsp;
      </span>
      <span class="text--strong text--upper" style="font-size: 16px; font-weight: 900;">
        🔋 {{ trmnl.battery_voltage | default: "100" }}%
      </span>
    </div>
  </div>
</div>
```
{% endraw %}

