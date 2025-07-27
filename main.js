let web3, userAccount, contract, usdt;

async function connectWallet() {
  if (window.ethereum || window.bitkeep?.ethereum) {
    web3 = new Web3(window.ethereum || window.bitkeep.ethereum);
    const accounts = await web3.eth.requestAccounts();
    userAccount = accounts[0];
    document.getElementById("walletStatus").innerText = "✅ " + userAccount;

    contract = new web3.eth.Contract(contractABI, contractAddress);
    usdt = new web3.eth.Contract(usdtABI, usdtAddress);

    const link = window.location.origin + window.location.pathname + "?ref=" + userAccount;
    document.getElementById("refLink").value = link;

    await switchNetwork();
    await loadStakes();
  } else {
    alert("กรุณาติดตั้ง MetaMask หรือ Bitget Wallet");
  }
}

async function switchNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }], // BNB Chain
    });
  } catch (err) {
    console.warn("Network switch failed", err);
  }
}

async function registerReferrer() {
  const ref = document.getElementById("refAddress").value;
  if (!web3.utils.isAddress(ref)) return alert("Referrer address ไม่ถูกต้อง");

  try {
    await contract.methods.registerReferrer(ref).send({ from: userAccount });
    alert("✅ สมัคร Referrer สำเร็จ");
  } catch (err) {
    alert("❌ สมัครล้มเหลว: " + err.message);
  }
}

async function buyToken() {
  const value = document.getElementById("usdtAmount").value;
  const amount = web3.utils.toWei(value, "ether");

  try {
    await usdt.methods.approve(contractAddress, amount).send({ from: userAccount });
    await contract.methods.buyWithReferralAndStake(amount).send({ from: userAccount });
    alert("✅ ซื้อ KJC และ stake สำเร็จ");
    await loadStakes();
  } catch (err) {
    alert("❌ ล้มเหลว: " + err.message);
  }
}

function copyReferralLink() {
  const copyText = document.getElementById("refLink");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  alert("✅ คัดลอกลิงก์แล้ว");
}

async function loadStakes() {
  const container = document.getElementById("stakesContainer");
  container.innerHTML = "";

  try {
    const count = await contract.methods.getStakeCount(userAccount).call();
    const now = Math.floor(Date.now() / 1000);

    for (let i = 0; i < count; i++) {
      const stake = await contract.methods.getStake(userAccount, i).call();
      const amount = web3.utils.fromWei(stake.amount, "ether");
      const startTime = parseInt(stake.startTime);
      const unlockTime = startTime + 180 * 86400; // 180 วัน
      const start = new Date(startTime * 1000).toLocaleDateString("th-TH");
      const unlock = new Date(unlockTime * 1000).toLocaleDateString("th-TH");

      const stakeDiv = document.createElement("div");
      stakeDiv.className = "stake-card";
      stakeDiv.innerHTML = `
        <p><strong>💰 Amount:</strong> ${amount} KJC</p>
        <p><strong>📅 Start:</strong> ${start}</p>
        <p><strong>🔓 Unlock:</strong> ${unlock}</p>
      `;

      const canClaim = now >= parseInt(stake.lastClaimTime) + 3 * 86400;
      const canUnstake = now >= unlockTime;

      if (!stake.claimed && canClaim) {
        const claimBtn = document.createElement("button");
        claimBtn.innerText = "🎁 Claim Reward";
        claimBtn.onclick = async () => {
          await contract.methods.claimStakeReward(i).send({ from: userAccount });
          alert("✅ เคลมสำเร็จ");
          loadStakes();
        };
        stakeDiv.appendChild(claimBtn);
      }

      if (!stake.claimed && canUnstake) {
        const unstakeBtn = document.createElement("button");
        unstakeBtn.innerText = "💼 Unstake";
        unstakeBtn.onclick = async () => {
          await contract.methods.unstake(i).send({ from: userAccount });
          alert("✅ ถอนสำเร็จ");
          loadStakes();
        };
        stakeDiv.appendChild(unstakeBtn);
      }

      container.appendChild(stakeDiv);
    }

    if (count == 0) container.innerHTML = "ยังไม่มีรายการ stake";
  } catch (err) {
    container.innerHTML = "❌ ไม่สามารถโหลดข้อมูลได้";
    console.error(err);
  }
}
