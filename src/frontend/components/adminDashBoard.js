import React, { useEffect, useState } from "react";

import "./adminDashBoard.css";

const AdminDashBoard = ({ marketplace, nft }) => {
    const [purchases, setPurchases] = useState([]);
    const [nftAddedCount, setNftAddedCount] = useState(0);
    const [nftSoldCount, setNftSoldCount] = useState(0);
    const [tradeHistory, setTradeHistory] = useState([]);


    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                if (marketplace) {
                    const offeredFilter = marketplace.filters.Offered();
                    const offeredEvents = await marketplace.queryFilter(offeredFilter);
                    setNftAddedCount(offeredEvents.length);

                    const boughtFilter = marketplace.filters.Bought();
                    const boughtEvents = await marketplace.queryFilter(boughtFilter);
                    setNftSoldCount(boughtEvents.length);
                }
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            }
        };

        const loadPurchasesData = async () => {
            try {
                if (marketplace) {
                    const boughtFilter = marketplace.filters.Bought();
                    const boughtEvents = await marketplace.queryFilter(boughtFilter);

                    const formattedPurchases = boughtEvents.map((event) => {
                        const { buyer, tokenId, price, timestamp } = event.args;
                        return {
                            time: new Date(timestamp.toNumber() * 1000).toLocaleTimeString(),
                            nft: `Token #${tokenId.toString()}`,
                            price: `${price.toString()} ETH`,
                            buyer: buyer,
                        };
                    });

                    setPurchases(formattedPurchases);
                }
            } catch (error) {
                console.error("Error loading purchases data:", error);
            }
        };

        const loadTradeHistory = async () => {
            try {
                if (marketplace) {
                    const boughtEvents = await marketplace.queryFilter(marketplace.filters.Bought());
                    const history = await Promise.all(
                        boughtEvents.map(async (event) => {
                            const { buyer, seller, tokenId, price, timestamp } = event.args;
                            return {
                                time: new Date(timestamp.toNumber() * 1000).toLocaleTimeString(),
                                nft: `Token #${tokenId.toString()}`,
                                price: `${price.toString()} ETH`,
                                buyer,
                                seller,
                            };
                        })
                    );
                    setTradeHistory(history.reverse());
                }
            } catch (error) {
                console.error("Error loading trade history:", error);
            }
        };

        if (marketplace) {
            loadDashboardData();
            loadPurchasesData();
            loadTradeHistory();

            marketplace.on("Offered", () => {
                loadDashboardData();
                loadPurchasesData();
                loadTradeHistory();
            });

            marketplace.on("Bought", () => {
                loadDashboardData();
                loadPurchasesData();
                loadTradeHistory();
            });

            return () => {
                marketplace.removeAllListeners("Offered");
                marketplace.removeAllListeners("Bought");
            };
        }
    }, [marketplace]);


    useEffect(() => {
        // Interval to add new alert lines (simulate terminal typing)
        const alertInterval = setInterval(() => {
            const terminalContent = document.querySelector(".alerts-panel .terminal-content");
            if (terminalContent) {
                const lines = terminalContent.querySelectorAll(".terminal-line");
                const firstLine = lines[0];
                if (firstLine) {
                    terminalContent.removeChild(firstLine);
                    const newLine = document.createElement("div");
                    newLine.className = "terminal-line";

                    // Generate random risk level
                    const riskLevel = Math.random();
                    let riskClass, riskText;
                    if (riskLevel > 0.7) {
                        riskClass = "high-risk";
                        riskText = "HIGH RISK";
                    } else if (riskLevel > 0.4) {
                        riskClass = "medium-risk";
                        riskText = "MEDIUM";
                    } else {
                        riskClass = "low-risk";
                        riskText = "LOW RISK";
                    }

                    // Random attack type and random address
                    const attackTypes = [
                        "Login attempts",
                        "Smart contract manipulation",
                        "Token transfer anomaly",
                        "API exploit attempt",
                        "Wallet connection request",
                        "Suspicious transaction",
                    ];
                    const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
                    const randomAddr =
                        Math.floor(Math.random() * 16777215)
                            .toString(16)
                            .padStart(4, "0") +
                        "..." +
                        Math.floor(Math.random() * 16777215)
                            .toString(16)
                            .padStart(4, "0");

                    // Format current time as HH:MM:SS
                    const now = new Date();
                    const timeStr = now.toTimeString().split(" ")[0];

                    newLine.innerHTML = `<span class="${riskClass} ${riskLevel > 0.7 ? "glitch" : ""}">[${timeStr}] ${riskText}: ${attackType} from ${randomAddr}</span>`;
                    terminalContent.appendChild(newLine);
                }
            }
        }, 8000); // Every 8 seconds

        // Interval to highlight a random row in tables
        const highlightInterval = setInterval(() => {
            const tables = document.querySelectorAll(".data-table, .blocklist-table");
            tables.forEach((table) => {
                const rows = table.querySelectorAll("tr");
                if (rows.length > 0) {
                    // Remove existing highlights
                    rows.forEach((row) => row.classList.remove("highlight"));
                    // Highlight a random row
                    const randomIndex = Math.floor(Math.random() * rows.length);
                    rows[randomIndex].classList.add("highlight");
                }
            });
        }, 5000);

        return () => {
            clearInterval(alertInterval);
            clearInterval(highlightInterval);
        };
    }, []);


    return (
        <>
            <div className="bg-grid"></div>
            <div className="scanline"></div>

            <div className="header">
                <h1>ADMIN 1173Ox</h1>
            </div>

            <div className="admin-container">
                {/* Status Panel */}
                <div className="panel status-panel">
                    <div className="panel-title">SITE STATUS</div>
                    <div className="panel-content">
                        <div className="status-info">
                            <div>
                                <span className="label">currently tracking:</span>{" "}
                                <span className="value">https://mynfty.net/</span>
                            </div>
                            <div>
                                <span className="label">users online:</span>{" "}
                                <span className="value">1457</span>
                            </div>
                            <div>
                                <span className="label">online since:</span>{" "}
                                <span className="value">3 hrs 54 mins 22 secs</span>
                            </div>
                            <div>
                                <span className="label">server load:</span>{" "}
                                <span className="value">78%</span>
                            </div>
                            <div>
                                <span className="label">error rate:</span>{" "}
                                <span className="value">0.4%</span>
                            </div>
                            <div>
                                <span className="label">attack attempts:</span>{" "}
                                <span className="value">342 today</span>
                            </div>
                            <div>
                                <span className="label">blocked IPs:</span>{" "}
                                <span className="value">67</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel trade-history-panel">
                    <div className="panel-title">TRADE HISTORY (Buy / Resell)</div>
                    <div className="panel-content">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>NFT</th>
                                    <th>Price</th>
                                    <th>Seller</th>
                                    <th>Buyer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>14:30</th>
                                    <th>Murel Art</th>
                                    <th>9</th>
                                    <th>@US</th>
                                    <th>@You</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Attackers Blocklist */}
                <div className="panel blocklist-panel">
                    <div className="panel-title">ATTACKERS BLOCKLIST</div>
                    <div className="panel-content">
                        <div className="status-info">
                            <div>
                                <span className="label">currently tracking:</span>{" "}
                                <span className="value">https://mynfty.net/</span>
                            </div>
                            <div>
                                <span className="label">users online:</span>{" "}
                                <span className="value">1457</span>
                            </div>
                            <div>
                                <span className="label">online since:</span>{" "}
                                <span className="value">3 hrs 24 mins 22 secs</span>
                            </div>
                            <div>
                                <span className="label">server load:</span>{" "}
                                <span className="value">78%</span>
                            </div>
                            <div>
                                <span className="label">error rate:</span>{" "}
                                <span className="value">0.4%</span>
                            </div>
                        </div>

                        <div className="blocklist-header">====ATTACKERS BLOCKLIST====</div>

                        <table className="blocklist-table">
                            <tbody>
                                <tr className="highlight">
                                    <td>0x7af3...d7c2</td>
                                    <td>03-21-2025 12:39:22</td>
                                </tr>
                                <tr>
                                    <td>0x4b31...e5f4</td>
                                    <td>03-20-2025 04:16:35</td>
                                </tr>
                                <tr>
                                    <td>0x5f35...7182</td>
                                    <td>03-20-2025 23:51:44</td>
                                </tr>
                                <tr>
                                    <td>0x1e4f...5f21</td>
                                    <td>03-19-2025 15:05:38</td>
                                </tr>
                                <tr>
                                    <td>0x702d...c9a4</td>
                                    <td>03-07-2025 04:45:12</td>
                                </tr>
                                <tr>
                                    <td>0x3d7b...81e5</td>
                                    <td>03-07-2025 01:12:33</td>
                                </tr>
                                <tr>
                                    <td>0x9c5e...a2f4</td>
                                    <td>03-06-2025 22:54:01</td>
                                </tr>
                                <tr>
                                    <td>0x6a1f...d3b7</td>
                                    <td>03-06-2025 19:37:29</td>
                                </tr>
                                <tr>
                                    <td>0xf47c...38a1</td>
                                    <td>03-05-2025 14:22:05</td>
                                </tr>
                                <tr>
                                    <td>0x2b8d...95c6</td>
                                    <td>03-04-2025 08:10:47</td>
                                </tr>
                                <tr>
                                    <td>0x8e3a...71d9</td>
                                    <td>03-04-2025 02:39:18</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Alerts Panel */}
                <div className="panel alerts-panel">
                    <div className="panel-title">ATTACKER ALERTS</div>
                    <div className="panel-content">
                        <div className="terminal-content">
                            <div className="terminal-line">
                                <span className="glitch high-risk">
                                    [21:45:12] HIGH RISK: Multiple login attempts from 0x7af3...d7c2
                                </span>
                            </div>
                            <div className="terminal-line">
                                <span className="medium-risk">
                                    [21:44:56] MEDIUM: Suspicious API call pattern from 0x4b31...e5f4
                                </span>
                            </div>
                            <div className="terminal-line">
                                <span className="high-risk">
                                    [21:42:57] HIGH RISK: Repeated exploit attempts from 0x7af3...d7c2
                                </span>
                            </div>
                            <div className="terminal-line">
                                <span className="medium-risk">
                                    [21:40:33] MEDIUM: Transaction value anomaly detected
                                </span>
                            </div>
                            <div className="terminal-line">
                                <span className="high-risk">
                                    [21:38:21] HIGH RISK: Smart contract manipulation attempt from 0x5f35...7182
                                </span>
                            </div>
                            <div className="terminal-line">
                                <span className="low-risk">
                                    [21:35:09] LOW RISK: Unusual login location for verified user
                                </span>
                            </div>
                            <div className="terminal-line">
                                <span className="medium-risk">
                                    [21:33:47] MEDIUM: Suspicious token transfer pattern detected
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terminal Panel */}
                <div className="panel terminal-panel">
                    <div className="panel-title">SECURITY TERMINAL</div>
                    <div className="panel-content">
                        <div className="terminal-content">
                            <div className="terminal-line">
                                <span className="terminal-prefix">admin@nft-sec:~$</span> scan --addr 0x7af3...d7c2
                            </div>
                            <div className="terminal-line">Running scan on 0x7af3...d7c2...</div>
                            <div className="terminal-line">
                                -- Connected IPs:{" "}
                                <span style={{ color: "#ffffff" }}>
                                    192.168.13.37, 45.33.102.44
                                </span>
                            </div>
                            <div className="terminal-line">
                                -- Location:{" "}
                                <span style={{ color: "#ffffff" }}>Amsterdam, Netherlands</span>
                            </div>
                            <div className="terminal-line">
                                -- Detected VPN:{" "}
                                <span style={{ color: "#ffffff" }}>Yes</span>
                            </div>
                            <div className="terminal-line">
                                -- Threat score:{" "}
                                <span className="high-risk">87/100 (HIGH)</span>
                            </div>
                            <div className="terminal-line">
                                <span className="terminal-prefix">admin@nft-sec:~$</span> block --addr
                                0x7af3...d7c2 --reason "Multiple exploit attempts"
                            </div>
                            <div className="terminal-line">
                                <span style={{ color: "#ffffff" }}>
                                    Address 0x7af3...d7c2 added to blocklist.
                                </span>
                            </div>
                            <div className="terminal-line">
                                <span className="terminal-prefix">admin@nft-sec:~$</span>{" "}
                                <span className="blink">▋</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Past Attacks Panel */}
                <div className="panel attacks-panel">
                    <div className="panel-title">PAST ATTACKS</div>
                    <div className="panel-content">
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <td>2025-03-20</td>
                                    <td>DDoS</td>
                                    <td className="high-risk">HIGH</td>
                                </tr>
                                <tr>
                                    <td>2025-03-17</td>
                                    <td>Contract Exploit</td>
                                    <td className="high-risk">CRITICAL</td>
                                </tr>
                                <tr>
                                    <td>2025-03-15</td>
                                    <td>Phishing</td>
                                    <td className="medium-risk">MEDIUM</td>
                                </tr>
                                <tr>
                                    <td>2025-03-12</td>
                                    <td>API Exploit</td>
                                    <td className="high-risk">HIGH</td>
                                </tr>
                                <tr>
                                    <td>2025-03-10</td>
                                    <td>Wallet Drain</td>
                                    <td className="high-risk">CRITICAL</td>
                                </tr>
                                <tr>
                                    <td>2025-03-08</td>
                                    <td>Token Spoof</td>
                                    <td className="medium-risk">MEDIUM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Sessions Panel */}
                <div className="panel sessions-panel">
                    <div className="panel-title">ENTRIES/LOGOUTS</div>
                    <div className="panel-content">
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <td>21:45:02</td>
                                    <td>admin</td>
                                    <td style={{ color: "#ffffff" }}>LOGIN</td>
                                </tr>
                                <tr>
                                    <td>21:30:15</td>
                                    <td>securityanalyst</td>
                                    <td>LOGOUT</td>
                                </tr>
                                <tr>
                                    <td>21:15:44</td>
                                    <td>system</td>
                                    <td>AUTO-LOGOUT</td>
                                </tr>
                                <tr>
                                    <td>20:52:11</td>
                                    <td>devops</td>
                                    <td style={{ color: "#ffffff" }}>LOGIN</td>
                                </tr>
                                <tr>
                                    <td>20:30:09</td>
                                    <td>admin</td>
                                    <td>LOGOUT</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Purchases Panel */}
                <div className="panel purchases-panel">
                    <div className="panel-title">Wallet ID</div>
                    <div className="panel-content">
                        <table className="data-table">
                            <tbody>
                                {purchases.length > 0 ? (
                                    purchases.map((purchase, index) => (
                                        <tr key={index}>
                                            <td>{purchase.time}</td>
                                            <td style={{ color: "#ffffff" }}>{purchase.nft}</td>
                                            <td>{purchase.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">0x976EA74026E726554dB657fA54763abd0C3a0aa9
                                            0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
                                        </td>


                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Suspicious Users Panel */}
                <div className="panel suspicious-panel">
                    <div className="panel-title">SUSPICIOUS USERS</div>
                    <div className="panel-content">
                        <table className="data-table">
                            <tbody>
                                <tr>
                                    <td style={{ color: "#ffffff" }}>0x7a3b...5e4d</td>
                                    <td className="high-risk">HIGH</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#ffffff" }}>0x3f5c...1a7b</td>
                                    <td className="medium-risk">MED</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#ffffff" }}>0xb21d...9c4a</td>
                                    <td className="medium-risk">MED</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#ffffff" }}>0x8e4f...2d6c</td>
                                    <td className="high-risk">HIGH</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#ffffff" }}>0xd12a...e7f8</td>
                                    <td className="medium-risk">MED</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#ffffff" }}>0x6c9b...3a2e</td>
                                    <td className="low-risk">LOW</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashBoard;