// =========================================================
// ARCHITLOCKER v3.1 - Educational Ransomware UI Simulation
// SAFE: No encryption, no data collection, no file access
// DEBUG-ENABLED VERSION
// =========================================================

console.log("script.js loaded ✅");

window.addEventListener("error", (e) => {
  console.error("Global JS error caught:", e.message);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired ✅");

  // -----------------------------
  // Element references
  // -----------------------------
  const bootScreen = document.getElementById("boot-screen");
  const ransomScreen = document.getElementById("ransom-screen");
  const enterSimBtn = document.getElementById("enter-sim-btn");

  console.log("bootScreen:", !!bootScreen);
  console.log("ransomScreen:", !!ransomScreen);
  console.log("enterSimBtn:", !!enterSimBtn);

  if (!bootScreen || !ransomScreen || !enterSimBtn) {
    console.warn(
      "One or more key elements missing. Check HTML IDs: boot-screen, ransom-screen, enter-sim-btn."
    );
  } else {
    // Optional debug alert so you SEE it's wired
    // You can comment this out later.
    alert("JS is working! Click OK, then click ENTER SIMULATION again.");

    enterSimBtn.addEventListener("click", () => {
      console.log("ENTER SIMULATION button clicked ✅");

      // Hide boot screen, show ransom screen (double method for safety)
      bootScreen.classList.remove("screen--active");
      ransomScreen.classList.add("screen--active");
      bootScreen.style.display = "none";
      ransomScreen.style.display = "block";

      // Start everything else
      startClock();
      startCountdown();
      startMetrics();
      startEncryptionSimulation();
      startLogTicker();

      addLogLine(
        "[SYS] Boot screen dismissed. Ransomware console simulation started.",
        "system"
      );
    });
  }

  // --------------------------------------------------------
  // Below this point is the same logic as before
  // (slightly trimmed for clarity, but fully functional)
  // --------------------------------------------------------

  const clockEl = document.getElementById("clock");
  const countdownEl = document.getElementById("countdown");

  const btcAddressEl = document.getElementById("btc-address");
  const copyBtcBtn = document.getElementById("copy-btc-btn");

  const metricCpu = document.getElementById("metric-cpu");
  const metricMem = document.getElementById("metric-mem");
  const metricDisk = document.getElementById("metric-disk");

  const statScanned = document.getElementById("stat-scanned");
  const statEncrypted = document.getElementById("stat-encrypted");
  const statDrives = document.getElementById("stat-drives");
  const statPercent = document.getElementById("stat-percent");
  const statusProgressBar = document.getElementById("status-progress-bar");

  const consoleLog = document.getElementById("console-log");
  const consoleStatus = document.getElementById("console-status");

  const glitchLayer = document.querySelector(".glitch-layer");

  const btnReplayEnc = document.getElementById("btn-test-encryption");
  const btnDecrypt = document.getElementById("btn-test-decrypt");
  const btnToggleGlitch = document.getElementById("btn-toggle-glitch");
  const btnInjectLog = document.getElementById("btn-inject-log");

  let countdownSeconds = 72 * 3600 - 1; // 71:59:59
  let countdownTimerId = null;
  let clockTimerId = null;
  let metricTimerId = null;
  let encTimerId = null;
  let logTimerId = null;

  let encryptionPercent = 0;
  let encryptionRunning = false;

  let glitchEnabled = true;

  let cpuVal = 35;
  let memVal = 42;
  let diskVal = 68;

  function pad(num) {
    return num.toString().padStart(2, "0");
  }

  function formatSeconds(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function scrollConsoleToBottom() {
    if (!consoleLog) return;
    consoleLog.scrollTop = consoleLog.scrollHeight;
  }

  function setConsoleStatus(text) {
    if (!consoleStatus) return;
    consoleStatus.textContent = text;
  }

  const LOG_LINES = [
    {
      type: "system",
      text: "[SYS] ArchitLocker framework initialized in SIMULATION mode.",
    },
    {
      type: "system",
      text: "[SYS] No real encryption will be performed. This is a training UI.",
    },
    {
      type: "info",
      text: "[INFO] Scanning local drives for demo targets...",
    },
    {
      type: "info",
      text: "[INFO] Mounted drives detected: C:, D:, E:, NETWORK_SHARE_01 (simulated).",
    },
    {
      type: "info",
      text: "[INFO] Enumerating documents, images, databases, project archives...",
    },
    {
      type: "system",
      text: "[SYS] Simulation engine: Bablulelo Bablala v3.1 / Mimotic Labs.",
    },
    {
      type: "warn",
      text: "[WARN] Found 12,847 candidate files. Marked for simulated encryption.",
    },
    {
      type: "info",
      text: "[INFO] Generating fake AES-256 keys and RSA-4096 keypair (demo only)...",
    },
    {
      type: "system",
      text: "[SYS] Public key fingerprint (sim): 11:AA:39:CD:FA:77:D1:09:9F:18.",
    },
    {
      type: "info",
      text: "[INFO] Starting staged encryption sequence (SIMULATION) ...",
    },
    {
      type: "info",
      text: "[INFO] encrypting demo files in /Users/... (visual only).",
    },
    {
      type: "info",
      text: "[INFO] encrypting demo images and media (visual only).",
    },
    {
      type: "warn",
      text: "[WARN] User attempted to close the window. Warning displayed (sim).",
    },
    {
      type: "error",
      text: "[ERROR] Antivirus tried to quarantine a simulated payload. Fighting back (in UI only).",
    },
    {
      type: "system",
      text: "[SYS] All UI counters updated. System remains fully intact. No files modified.",
    },
    {
      type: "system",
      text: "[SYS] Reminder: This screen is for awareness training only.",
    },
  ];

  function addLogLine(text, type = "info") {
    if (!consoleLog) return;

    const lineEl = document.createElement("div");
    lineEl.classList.add("log-line");
    if (type === "info") lineEl.classList.add("log-line--info");
    if (type === "warn") lineEl.classList.add("log-line--warn");
    if (type === "error") lineEl.classList.add("log-line--error");
    if (type === "system") lineEl.classList.add("log-line--system");

    const timestamp = new Date().toLocaleTimeString();
    lineEl.textContent = `[${timestamp}] ${text}`;
    consoleLog.appendChild(lineEl);

    const maxLines = 140;
    while (consoleLog.childElementCount > maxLines) {
      consoleLog.removeChild(consoleLog.firstChild);
    }

    scrollConsoleToBottom();
  }

  function startLogTicker() {
    if (!consoleLog) return;
    if (logTimerId) clearInterval(logTimerId);

    let index = 0;
    addLogLine(LOG_LINES[0].text, LOG_LINES[0].type);
    addLogLine(LOG_LINES[1].text, LOG_LINES[1].type);

    logTimerId = setInterval(() => {
      const entry = LOG_LINES[index % LOG_LINES.length];
      addLogLine(entry.text, entry.type);
      index++;
    }, 1700);
  }

  function injectRandomLog() {
    const entry = LOG_LINES[randomInt(0, LOG_LINES.length - 1)];
    addLogLine(entry.text, entry.type);
  }

  function startClock() {
    if (!clockEl) return;
    if (clockTimerId) clearInterval(clockTimerId);

    function updateClock() {
      const now = new Date();
      const hh = pad(now.getHours());
      const mm = pad(now.getMinutes());
      const ss = pad(now.getSeconds());
      clockEl.textContent = `${hh}:${mm}:${ss}`;
    }

    updateClock();
    clockTimerId = setInterval(updateClock, 1000);
  }

  function startCountdown() {
    if (!countdownEl) return;
    if (countdownTimerId) clearInterval(countdownTimerId);

    function tick() {
      if (countdownSeconds <= 0) {
        countdownSeconds = 0;
        countdownEl.textContent = "00:00:00";
        countdownEl.style.color = "#ff1744";
        addLogLine(
          "[WARN] Demo countdown reached zero. In a real incident, keys might be destroyed here.",
          "warn"
        );
        clearInterval(countdownTimerId);
        return;
      }
      countdownEl.textContent = formatSeconds(countdownSeconds);
      countdownSeconds -= 1;
    }

    tick();
    countdownTimerId = setInterval(tick, 1000);
  }

  function renderMetricBar(el, value) {
    if (!el) return;
    el.style.width = `${value}%`;
  }

  function startMetrics() {
    if (metricTimerId) clearInterval(metricTimerId);

    function updateMetrics() {
      cpuVal = clamp(cpuVal + randomInt(-8, 10), 15, 98);
      memVal = clamp(memVal + randomInt(-4, 6), 25, 95);
      diskVal = clamp(diskVal + randomInt(-2, 3), 45, 100);

      renderMetricBar(metricCpu, cpuVal);
      renderMetricBar(metricMem, memVal);
      renderMetricBar(metricDisk, diskVal);
    }

    updateMetrics();
    metricTimerId = setInterval(updateMetrics, 900);
  }

  function resetEncryptionStats() {
    encryptionPercent = 0;
    if (statScanned) statScanned.textContent = "0";
    if (statEncrypted) statEncrypted.textContent = "0";
    if (statDrives) statDrives.textContent = "0";
    if (statPercent) statPercent.textContent = "0%";
    if (statusProgressBar) statusProgressBar.style.width = "0%";
  }

  function startEncryptionSimulation() {
    if (encTimerId) clearInterval(encTimerId);
    resetEncryptionStats();
    encryptionRunning = true;
    setConsoleStatus("ENCRYPTION");

    addLogLine(
      "[INFO] Starting encryption sequence (visual only, no real files affected).",
      "info"
    );

    const totalDuration = 35000;
    const stepMs = 200;
    const steps = Math.floor(totalDuration / stepMs);
    const stepIncrement = 100 / steps;

    encTimerId = setInterval(() => {
      encryptionPercent = Math.min(100, encryptionPercent + stepIncrement);

      const scanned = Math.floor(12847 * (encryptionPercent / 100));
      const encrypted = Math.floor(scanned * randomInt(85, 97) / 100);
      const drives = Math.min(4, Math.max(1, Math.round(encryptionPercent / 30)));

      if (statScanned) statScanned.textContent = scanned.toLocaleString();
      if (statEncrypted)
        statEncrypted.textContent = encrypted.toLocaleString();
      if (statDrives) statDrives.textContent = String(drives);
      if (statPercent)
        statPercent.textContent = `${Math.round(encryptionPercent)}%`;
      if (statusProgressBar)
        statusProgressBar.style.width = `${encryptionPercent}%`;

      if (encryptionPercent >= 100) {
        clearInterval(encTimerId);
        encryptionRunning = false;
        setConsoleStatus("IDLE");
        addLogLine(
          "[SYS] Visual encryption phase reached 100%. System remains untouched.",
          "system"
        );
      }
    }, stepMs);
  }

  function runDecryptSimulation() {
    addLogLine(
      "[SYS] Operator requested decryption (demo). Verifying payment status (simulated)...",
      "system"
    );
    setConsoleStatus("DECRYPTOR");

    let phase = 0;
    const phases = [
      "[INFO] Checking blockchain (fake). No real network requests are made.",
      "[INFO] Simulated payment confirmation received.",
      "[INFO] Running pseudo-decryptor to reverse UI state...",
      "[SYS] Decryption simulation complete. All counters remain purely visual.",
    ];

    const interval = setInterval(() => {
      addLogLine(
        phases[phase],
        phase === phases.length - 1 ? "system" : "info"
      );
      phase++;

      if (phase >= phases.length) {
        clearInterval(interval);
        setConsoleStatus("IDLE");
        resetEncryptionStats();
      }
    }, 1200);
  }

  function copyBtcAddress() {
    if (!btcAddressEl || !copyBtcBtn) return;
    const addr = btcAddressEl.textContent.trim();
    if (!addr) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(addr)
        .then(() => {
          addLogLine(
            "[INFO] Demo BTC address copied to clipboard (no real payment required).",
            "info"
          );
          const original = copyBtcBtn.textContent;
          copyBtcBtn.textContent = "COPIED!";
          setTimeout(() => {
            copyBtcBtn.textContent = original;
          }, 1200);
        })
        .catch(() => {
          addLogLine(
            "[WARN] Clipboard copy failed in this browser. Copy manually if needed.",
            "warn"
          );
        });
    } else {
      addLogLine(
        "[WARN] Clipboard API not available. Please select and copy the address manually.",
        "warn"
      );
    }
  }

  function toggleGlitch() {
    glitchEnabled = !glitchEnabled;
    if (!glitchLayer) return;

    if (glitchEnabled) {
      glitchLayer.style.opacity = "0.35";
      addLogLine(
        "[INFO] Glitch overlay enabled for cinematic display.",
        "info"
      );
    } else {
      glitchLayer.style.opacity = "0";
      addLogLine(
        "[INFO] Glitch overlay disabled for clearer viewing.",
        "info"
      );
    }
  }

  if (copyBtcBtn) {
    copyBtcBtn.addEventListener("click", copyBtcAddress);
  }

  if (btnReplayEnc) {
    btnReplayEnc.addEventListener("click", () => {
      addLogLine(
        "[INFO] Operator requested replay of encryption sequence (visual only).",
        "info"
      );
      startEncryptionSimulation();
    });
  }

  if (btnDecrypt) {
    btnDecrypt.addEventListener("click", () => {
      runDecryptSimulation();
    });
  }

  if (btnToggleGlitch) {
    btnToggleGlitch.addEventListener("click", () => {
      toggleGlitch();
    });
  }

  if (btnInjectLog) {
    btnInjectLog.addEventListener("click", () => {
      injectRandomLog();
    });
  }
});
