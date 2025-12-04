<template>
    <transition name="fade-slide" appear>
        <div class="about">
            <main class="about">
                <!--  this is so you dont have to scroll -->
                <nav class="subnav">
                    <div class="container subnav__wrap">
                        <a href="#top" @click.prevent="scrollTo('top')">Top</a>
                        <a href="#mv" @click.prevent="scrollTo('mv')">Mission & Vision</a>
                        <a href="#story" @click.prevent="scrollTo('story')">Our Story</a>
                        <a href="#values" @click.prevent="scrollTo('values')">Values</a>
                        <a href="#team" @click.prevent="scrollTo('team')">Team</a>
                        <a href="#stats" @click.prevent="scrollTo('stats')">Stats</a>
                        <a href="#sustain" @click.prevent="scrollTo('sustain')">Sustainability</a>
                        <a href="#invest" @click.prevent="scrollTo('invest')">Investors Relations</a>
                        <a href="#timeline" @click.prevent="scrollTo('journey')">Journey</a>
                    </div>
                </nav>

                <!-- Hero -->
                <section id="top" class="hero">
                    <div class="container hero__wrap">
                        <div class="hero__text">
                            <h1>About <span>Fashion Hub</span></h1>
                            <p class="lead">
                                why choose between trenfy and timeless? we deliver both, plus great prices and great
                                service ...to fashion lovers across South Africa
                            </p>

                            <ul class="hero__badges">
                                <li>Affordable Quality</li>
                                <li>New Drops Weekly</li>
                                <li>Community First</li>
                            </ul>

                            <div class="hero__cta">
                                <button class="btn btn--primary" @click.prevent="scrollTo('story')">
                                    Learn Our Story
                                </button>
                                <button class="btn btn--primary" @click.prevent="scrollTo('sustain')">
                                    Our Sustainability
                                </button>
                                <button class="btn btn--primary" @click.prevent="scrollTo('team')">
                                    Our Team
                                </button>
                            </div>
                        </div>

                        <div class="hero__media">
                            <div class="card photo photo--1" aria-label="Fashion look 1"></div>
                            <div class="card photo photo--2" aria-label="Fashion look 2"></div>
                            <div class="card photo photo--3" aria-label="Fashion look 3"></div>
                        </div>
                    </div>
                </section>

                <!-- Fading Mission & Vision it looked ugly last time lol -->
                <section id="mv" class="section section--mv">
                    <div class="container mv__wrap">
                        <!-- Left: Tabs / labels -->
                        <div class="mv__labels">
                            <button class="mv__pill" :class="{ active: showMission }" @click="forceShow('mission')">
                                🚀 Mission
                            </button>
                            <button class="mv__pill" :class="{ active: !showMission }" @click="forceShow('vision')">
                                🌟 Vision
                            </button>
                        </div>

                        <!-- Right: Fader -->
                        <div class="mv__pane">
                            <transition name="fade-swap" mode="out-in">
                                <div v-if="showMission" key="mission" class="mv__card card card--lift"
                                    aria-live="polite">
                                    <h3 style="color: #3b82f6">Our Mission</h3>
                                    <p>
                                        To serve looks that slay, fits that flex, and vibes that boost confidence —
                                        celebrating every body and turning every sidewalk into a personal runway.
                                    </p>
                                </div>
                                <div v-else key="vision" class="mv__card card card--lift" aria-live="polite">
                                    <h3 style="color: #3b82f6">Our Vision</h3>
                                    <p>
                                        To lead our fashion fam into a world where style is a superpower, confidence
                                        is the only dress code, and every step is giving catwalk energy.
                                    </p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </section>

                <!-- Quick Stats (counts up on view)  hopefully , if it doesnt we can remove this part-->
                <section id="stats" class="stats" ref="statsSection">
                    <div class="container stats__grid">
                        <div class="stat">
                            <div class="stat__num">{{ animated.stylesWeekly }}+</div>
                            <div class="stat__label">New styles each week</div>
                        </div>
                        <div class="stat">
                            <div class="stat__num">{{ stats.purpose }}</div>
                            <div class="stat__label">Fashion with purpose</div>
                        </div>
                        <div class="stat">
                            <div class="stat__num">{{ animated.clickCollect }}</div>
                            <div class="stat__label">Click & Collect points</div>
                        </div>
                        <div class="stat">
                            <div class="stat__num">{{ animated.communityHours }}k</div>
                            <div class="stat__label">Community hours</div>
                        </div>
                    </div>
                </section>

                <!-- Our Story -->
                <section id="story" class="section section--story">
                    <div class="container two-col">
                        <div class="two-col__left">
                            <h2>Our Story</h2>
                            <p>
                                Fashion Hub began with one simple belief: looking great and feeling confident shouldn’t
                                cost a fortune.
                                From our humble first collection to today’s growing range for Women, Men, Kids, and
                                Shoes, we keep prices low and styles fresh so you can create the wardrobe you love, without the budget blues.
                            </p>
                            <p>
                                We design with South African life in mind: school runs, weekend markets, work fits,
                                chilled days then we deliver it online and in-store with no-fuss service.
                            </p>
                            <ul class="ticks">
                                <li>Everyday value & trend-led drops</li>
                                <li>Quality fabrics, better fits, durable basics</li>
                                <li>Local love, global inspiration</li>
                            </ul>
                        </div>
                        <div class="two-col__right">
                            <div class="card card--shadow story__image" aria-label="Team crafting designs"></div>
                        </div>
                    </div>
                </section>

                <!-- What We Stand For -->
                <section id="values" class="section section--values">
                    <div class="container">
                        <h2 class="center">What We Stand For</h2>
                        <div class="features">
                            <article class="feature card card--lift">
                                <div class="feature__icon" aria-hidden="true">💙</div>
                                <h3>Every Rand Counts</h3>
                                <p>We plan smart, buy smart, and operate lean—so savings show up on the price tag.</p>
                            </article>
                            <article class="feature card card--lift">
                                <div class="feature__icon" aria-hidden="true">🧵</div>
                                <h3>Made to Be Worn</h3>
                                <p>Fit-tested essentials and on-trend pieces designed for everyday comfort.</p>
                            </article>
                            <article class="feature card card--lift">
                                <div class="feature__icon" aria-hidden="true">🌍</div>
                                <h3>Better Choices</h3>
                                <p>More responsible materials, less waste in packaging, and longer-life garments.</p>
                            </article>
                            <article class="feature card card--lift">
                                <div class="feature__icon" aria-hidden="true">🤝</div>
                                <h3>Community</h3>
                                <p>We invest in youth skills, schools, and local makers—because growth is shared.</p>
                            </article>
                        </div>
                    </div>
                </section>

                <!-- Meet the Team of coz im keeping this part  -->
                <section id="team" class="section section--team">
                    <div class="container">
                        <h2 class="center">Meet the Team</h2>
                        <div class="team">
                            <article class="teammate card card--lift" v-for="m in team" :key="m.name">
                                <img :src="m.image" :alt="m.name" loading="lazy" />
                                <h4>{{ m.name }}</h4>
                                <small class="muted">{{ m.role }}</small>
                            </article>
                        </div>
                    </div>
                </section>

                <!-- How We Keep Prices Low -->
                <section class="section section--how">
                    <div class="container two-col two-col--rev">
                        <div class="two-col__left">
                            <div class="card card--shadow how__image" aria-label="Supply chain and logistics"></div>
                        </div>
                        <div class="two-col__right">
                            <h2>How We Keep Prices Low</h2>
                            <ol class="steps">
                                <li><strong>Direct Partnerships:</strong> We work closely with trusted mills and
                                    factories.</li>
                                <li><strong>Smart Buys:</strong> Bulk orders and tight range planning reduce costs.</li>
                                <li><strong>Lean Operations:</strong> Efficient logistics and simple packaging.</li>
                                <li><strong>No Middlemen:</strong> Savings go straight into lower prices.</li>
                            </ol>
                            <div class="note">
                                Prices are sharp, quality stays non-negotiable.
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Omni-channel -->
                <section class="section section--omni">
                    <div class="container">
                        <h2 class="center">Shop Your Way</h2>
                        <div class="grid-3">
                            <div class="tile card">
                                <div class="tile__icon">🛒</div>
                                <h3>Online</h3>
                                <p>Browse, wishlist, and checkout in minutes. Track orders easily.</p>
                            </div>
                            <div class="tile card">
                                <div class="tile__icon">📦</div>
                                <h3>Click & Collect</h3>
                                <p>Order online, collect at a pickup point near you.</p>
                            </div>
                            <div class="tile card">
                                <div class="tile__icon">💳</div>
                                <h3>Easy Payment</h3>
                                <p>Cards, EFT, and store credit options. More wallets coming soon.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Sustainability & Community  saw this part on mr price website-->
                <section id="sustain" class="section section--sustain">
                    <div class="container two-col">
                        <div class="two-col__left">
                            <h2>Sustainability & Community</h2>
                            <p>
                                We’re on a journey to do better—prioritising recycled fibres where possible,
                                using less plastic in our packaging, and backing education programmes that
                                open doors for young people.
                            </p>
                            <ul class="ticks">
                                <li>Increasing recycled & responsibly sourced materials</li>
                                <li>Reducing single-use packaging</li>
                                <li>Youth skills & school partnerships</li>
                            </ul>
                        </div>
                        <div class="two-col__right">
                            <div class="card card--shadow sustain__image" aria-label="Community initiative"></div>
                        </div>
                    </div>
                </section>

                <!-- Investors-->
                <section id="invest" class="section section--invest">
                    <div class="container two-col">
                        <div class="two-col__left">
                            <h2>Our Investors</h2>
                            <p>
                                we are on a journey to deliver strong, transparent returns-prioritizing revenue growth,
                                strategic investments , and initiatives that strengthen shareholder value
                            </p>
                            <ul class="ticks">
                                <li>Year-over-year revenue growth and profitability</li>
                                <li>Strategic market expansion and investments</li>
                                <li>Transparent reporting and investor engagement</li>
                            </ul>
                        </div>
                        <div class="two-col__right">
                            <div class="card card--shadow invest__image" aria-label="Company partners"></div>
                        </div>
                    </div>
                </section>

                <!-- Journey Timeline -->
                <section class="timeline-section" id="journey">
                    <h2>Our Journey</h2>
                    <div class="timeline-container" ref="timeline">
                        <div class="timeline-item" v-for="(item, idx) in timeline" :key="idx">
                            <span class="year">{{ item.year }}</span>
                            <p>{{ item.event }}</p>
                        </div>
                    </div>
                </section>
            </main>

            <FooterComp />
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import FooterComp from "../components/FooterComp.vue";
import script from '../scripts/HomeScript.js'


export default {
    name: "About",
    components: {
        FooterComp,
    },
    mixins: [script],

    data() {
        return {
            email: "",
            // targets for count-up
            stats: {
                stylesWeekly: 600,
                purpose: "Value + Impact",
                clickCollect: 450,
                communityHours: 12
            },
            animated: {
                stylesWeekly: 0,
                clickCollect: 0,
                communityHours: 0
            },
            hasCounted: false,

            // Mission/Vision fader
            showMission: true,
            mvTimer: null,

            // team not sure about the profile thievery
            team: [
                { id: 1, name: "Zuhayr Smith", role: "Creative Director", image: 'https://ca.slack-edge.com/T02LW4RMXJQ-U08NBS2GBK6-d6f2b6181e78-192' },
                { id: 2, name: "Ayyoob Dawood", role: "Head of Marketing", image: 'https://ca.slack-edge.com/T02LW4RMXJQ-U08PL2230KE-141767e93e4e-192' },
                { id: 3, name: "Laila Abdurahman", role: "Lead Designer", image: 'https://ca.slack-edge.com/T02LW4RMXJQ-U08NKGD0UG1-c6b72d06d82f-512' },
                { id: 4, name: "Atang Makara", role: "Operations Manager", image: 'https://ca.slack-edge.com/T02LW4RMXJQ-U08NKGD0UG1-6aaa31cb3248-192' },
                { id: 5, name: "Sipho Gcilishe", role: "Fashion Curator", image: 'https://ca.slack-edge.com/T02LW4RMXJQ-U08NBS1J5PE-7bf943ee310d-512' },
            ],
            timeline: [
                { year: "2019", event: "Fashion Hub was founded in Cape Town." },
                { year: "2020", event: "Expanded online store nationwide." },
                { year: "2021", event: "Launched sustainable fashion line." },
                { year: "2022", event: "Partnered with 50+ local designers." },
                { year: "2023", event: "Branched to kids and shoes." },
                { year: "2024", event: "Included accessories for kids and adults." },
                { year: "2025", event: "Now we are still growing, with new additions weeklyand new new brands joining the fashion hub family." }
            ],
        };
    },

    computed: {
        ...mapState(["user"]),
    },

    mounted() {
        // start MV autoplay
        this.startMvLoop();
        // start timeline scroll
        this.startTimelineLoop();

        // set up observer for stats
        const el = this.$refs.statsSection;
        if (el && "IntersectionObserver" in window) {
            const io = new IntersectionObserver(
                entries => {
                    entries.forEach(e => {
                        if (e.isIntersecting && !this.hasCounted) {
                            this.hasCounted = true;
                            this.startCounters();
                            io.disconnect();
                        }
                    });
                },
                { threshold: 0.3 }
            );
            io.observe(el);
        } else {
            // fallback: start immediately
            this.startCounters();
        }
    },
    beforeUnmount() {
        if (this.mvTimer) clearInterval(this.mvTimer);
    },
    methods: {
        subscribe() {
            if (!this.email || !/.+@.+\..+/.test(this.email)) {
                alert("Please enter a valid email address.");
                return;
            }
            alert(`Thanks for subscribing, ${this.email}!`);
            this.email = "";
        },

        scrollTo(id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        },

        // Mission/Vision fader controls
        startMvLoop() {
            this.mvTimer = setInterval(() => {
                this.showMission = !this.showMission;
            }, 4500);
        },
        forceShow(which) {
            this.showMission = which === "mission";
            // reset timer so it feels responsive
            if (this.mvTimer) clearInterval(this.mvTimer);
            this.startMvLoop();
        },

        // Count up numbers
        startCounters() {
            const duration = 8000;
            this.animateCount("stylesWeekly", this.stats.stylesWeekly, duration);
            this.animateCount("clickCollect", this.stats.clickCollect, duration);
            this.animateCount("communityHours", this.stats.communityHours, duration);
        },
        animateCount(key, target, duration) {
            const start = 0;
            const startTime = performance.now();

            const step = now => {
                const p = Math.min((now - startTime) / duration, 1);
                const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic
                this.animated[key] = Math.round(start + (target - start) * ease);
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        },
        startTimelineLoop() {
            const container = this.$refs.timeline;
            let scrollSpeed = 1;
            setInterval(() => {
                container.scrollLeft += scrollSpeed;
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    container.scrollLeft = 0;
                }
            }, 30);
        },
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

/* Fade slide animation */
.fade-slide-enter-active {
    transition: all 0.8s ease;
}

.fade-slide-leave-active {
    transition: all 0.4s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.fade-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

/* theme colors i used */
:root {
    --blue-900: #0b3b73;
    --blue-700: #1554a1;
    --blue-500: #1e6bd6;
    --blue-100: #e8f1ff;
    --ink-900: #0a1420;
    --ink-700: #243447;
    --ink-500: #516173;
    --ink-300: #95a3b3;
    --white: #ffffff;
    --bg: #f7f9fc;
    --radius: 18px;
    --shadow: 0 8px 24px rgba(11, 59, 115, 0.12);
    --shadow-soft: 0 4px 14px rgba(11, 59, 115, 0.1);
}

* {
    box-sizing: border-box;
}

.about {
    background: var(--bg);
    color: var(--ink-900);
    line-height: 1.6;
}

.container {
    width: min(1120px, 92%);
    margin: 0 auto;
}

/* the scroll nav */
.subnav {
    position: relative;
    z-index: 30;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid #e6eefb;
    text-align: center;
}

.subnav__wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 0;
    justify-content: center;
}

.subnav a {
    text-decoration: none;
    color: var(--blue-700);
    font-family: Inter, sans-serif;
    text-align: center;
    font-weight: 700;
    font-size: 0.95rem;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid #d6e6ff;
    background: #fff;
    box-shadow: var(--shadow-soft);
}

.subnav a:hover {
    background: var(--blue-100);
}

@media (max-width: 768px) {
    .subnav {
        display: none;
    }

    .hero {
        padding: 30px 0;
    }

    .hero__wrap {
        padding: 0;
        gap: 16px;
    }

    .hero__text {
        order: 1;
    }

    .hero h1 {
        font-size: clamp(24px, 6vw, 32px);
        margin: 0 0 12px;
    }

    .lead {
        font-size: 0.95rem;
        margin: 0 0 12px;
        line-height: 1.5;
    }

    .hero__badges {
        gap: 6px;
        margin: 10px 0 16px;
    }

    .hero__badges li {
        padding: 6px 10px;
        font-size: 0.85rem;
    }

    .hero__cta {
        flex-direction: column;
        gap: 10px;
    }

    .hero__media {
        display: none;
    }

    .section {
        padding: 24px 0;
    }

    .section h2 {
        font-size: clamp(20px, 5vw, 28px);
        margin: 0 0 16px;
    }

    .mv__wrap {
        flex-direction: column;
        gap: 16px;
    }

    .mv__labels {
        gap: 8px;
    }

    .mv__pill {
        padding: 8px 12px;
        font-size: 0.9rem;
    }

    .mv__card {
        padding: 16px;
    }

    .mv__card h3 {
        font-size: 1.2rem;
        margin: 0 0 12px;
    }

    .mv__card p {
        font-size: 0.9rem;
        line-height: 1.6;
    }

    .stats__grid {
        gap: 12px;
    }

    .stat {
        padding: 16px 12px;
    }

    .stat__num {
        font-size: 24px;
    }

    .stat__label {
        font-size: 0.85rem;
    }

    .timeline-section {
        padding: 24px 12px;
    }

    .timeline-section h2 {
        font-size: clamp(20px, 5vw, 28px);
        margin: 0 0 16px;
    }

    .timeline-container {
        gap: 20px;
    }

    .timeline-item {
        min-width: 150px;
        padding: 16px;
        font-size: 0.9rem;
    }

    .two-col,
    .two-col--rev {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .two-col h3,
    .two-col--rev h3 {
        font-size: 1.2rem;
        margin: 0 0 12px;
    }

    .two-col p,
    .two-col--rev p {
        font-size: 0.9rem;
        line-height: 1.6;
    }

    .features {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .feature {
        padding: 16px;
    }

    .feature h4 {
        font-size: 1rem;
        margin: 0 0 8px;
    }

    .team {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .team__card {
        padding: 16px;
    }

    .team__card h4 {
        font-size: 1rem;
        margin: 0 0 4px;
    }

    .team__card p {
        font-size: 0.85rem;
    }

    .cta__actions {
        flex-direction: column;
        gap: 10px;
    }

    .cta__actions button {
        width: 100%;
        padding: 12px;
        font-size: 0.95rem;
    }

    .timeline {
        padding: 0;
    }

    .timeline li {
        padding-left: 30px;
        margin-bottom: 12px;
    }

    .timeline::before {
        left: 10px;
    }

    .timeline .dot {
        left: 2px;
        width: 14px;
        height: 14px;
    }

    .timecard {
        padding: 12px;
        font-size: 0.9rem;
    }

    .ticks {
        padding-left: 0;
    }

    .ticks li {
        padding-left: 20px;
        font-size: 0.95rem;
    }
}

/* Timeline */
.timeline-section {
    padding: 50px 20px;
}

.timeline-section h2{
    text-align: center;
    font-size: clamp(36px, 3.2vw, 34px);
    color: #3b82f6;
    font-weight: 800;
    margin-bottom: 25px;
}

.timeline-container {
    display: flex;
    overflow-x: auto;
    gap: 40px;
    scrollbar-width: none;
}

.timeline-item {
    flex: 0 0 auto;
    min-width: 200px;
    padding: 20px;
    background: #f1f5f9;
    border-radius: 10px;
    text-align: center;
}

.timeline-item .year {
    font-weight: bold;
    color: #3b82f6;
    display: block;
    margin-bottom: 10px;
}

/*Hero  */
.hero {
    background: linear-gradient(180deg, var(--blue-100), #f9fbff 60%);
    overflow: clip;
    padding: 10px 0;
}

.hero__wrap {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 36px;
    align-items: center;
}

.hero h1 {
    font-size: clamp(36px, 4vw, 48px);
    
    font-weight: 800;
    margin: 0 0 8px;
    letter-spacing: -0.02em;
}

.hero h1 span {
    color: transparent;
    background: linear-gradient(90deg, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    background-clip: text;
}


.lead {
    font-size: 1.1rem;
    color: var(--ink-700);
    margin: 0 0 16px;
}

.hero__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0;
    margin: 12px 0 18px;
    list-style: none;
}

.hero__badges li {
    background: var(--white);
    border: 1px solid #e6eefb;
    padding: 8px 12px;
    border-radius: 999px;
    font-weight: 600;
    box-shadow: var(--shadow-soft);
}

.hero__cta {
    display: flex;
    gap: 12px;
}

.hero__media {
    position: relative;
    min-height: 320px;
}

.card {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
}

.card--shadow {
    box-shadow: var(--shadow);
}

.card--lift {
    transition: transform .2s ease, box-shadow .2s ease;
}

.card--lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(11, 59, 115, .18);
}

.photo {
    position: absolute;
    inset: auto;
    width: 56%;
    height: 58%;
    background-size: cover;
    background-position: center;
}

.photo--1 {
    top: 0;
    right: 0;
    background-image: url('https://cdn.pixabay.com/photo/2025/06/30/01/24/01-24-42-704_1280.jpg');
    border: 6px solid var(--white);
}

.photo--2 {
    bottom: 10px;
    left: 0;
    background-image: url('https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_1280.jpg');
    transform: rotate(-4deg);
    border: 6px solid var(--white);
}

.photo--3 {
    bottom: -18px;
    right: 8%;
    width: 42%;
    height: 42%;
    background-image: url('https://cdn.pixabay.com/photo/2023/04/03/15/02/woman-7897053_1280.jpg');
    transform: rotate(6deg);
    border: 4px solid var(--white);
}

/*  MV fader  */
.section--mv {
    padding: 36px 0 10px;
}

.mv__wrap {
    display: grid;
    grid-template-columns: 0.38fr 1.62fr;
    gap: 18px;
    align-items: start;
}

.mv__labels {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.mv__pill {
    background: #fff;
    border: 1px solid #d6e6ff;
    border-radius: 999px;
    padding: 8px 14px;
    font-weight: 700;
    color: var(--blue-700);
    box-shadow: var(--shadow-soft);
    cursor: pointer;
}

.mv__pill.active {
    background: var(--blue-500);
    color: #fff;
    border-color: var(--blue-500);
}

.mv__pane {
    min-height: 130px;
}

.mv__card {
    padding: 20px;
}

.fade-swap-enter-active,
.fade-swap-leave-active {
    transition: opacity .45s ease, transform .45s ease;
}

.fade-swap-enter-from,
.fade-swap-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

/*  Buttons */
.btn {
    appearance: none;
    border: 0;
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 12px;
    font-weight: 700;
    transition: transform .15s ease, box-shadow .15s ease, background .2s ease, color .2s ease;
}

.btn--primary {
    background: var(--blue-500);
    color: var(--white);
    box-shadow: 0 8px 18px rgba(30, 107, 214, .25);
}

.btn--primary:hover {
    transform: translateY(-1px);
}

.btn--ghost {
    background: var(--white);
    color: var(--blue-700);
    border: 1px solid #d6e6ff;
}

.btn--dark {
    background: var(--ink-900);
    color: var(--white);
}

.btn--dark:hover {
    transform: translateY(-1px);
}

/* Stats */
.stats {
    padding: 22px 0 10px;
}

.stats__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.stat {
    background: var(--white);
    padding: 22px 18px;
    border-radius: var(--radius);
    box-shadow: var(--shadow-soft);
    text-align: center;
}

.stat__num {
    font-weight: 800;
    font-size: 28px;
    color: #3b82f6;
}

.stat__label {
    color: var(--ink-500);
}

/*  Sections  */
.section {
    padding: 54px 0;
}

.section h2 {
    font-weight: 800;
    color: #3b82f6;
    font-size: clamp(26px, 3.2vw, 34px);
    margin: 0 0 20px;
    letter-spacing: -0.01em;
}

.center {
    text-align: center;
}

.two-col {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 28px;
    align-items: center;
}

.two-col--rev {
    grid-template-columns: 0.95fr 1.05fr;
}

.two-col__left,
.two-col__right {
    min-width: 0;
}

.story__image {
    height: 320px;
    background: url('https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_1280.jpg') center/cover no-repeat;
}

/* what we stand for section */
.features {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin-top: 8px;
    text-align: center;
}

.feature {
    padding: 20px;
    text-align: left;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 25px;
    text-align: center;
}

.feature__icon {
    font-size: 28px;
    text-align: center;
}

/* keeping prices low section */
.section--how .how__image {
    height: 300px;
    background: url('https://media.istockphoto.com/id/802304078/photo/many-south-african-one-and-two-hundred-rand-banknotes-closeup.jpg?s=612x612&w=0&k=20&c=aV55Xpdcxh31LFW5OwnQ95lG-mdEjfi-hEZQUkG_nN4=') center/cover no-repeat;
}

.steps {
    padding-left: 18px;
}

.steps li {
    margin: 10px 0;
}

.note {
    margin-top: 10px;
    background: var(--blue-100);
    border-left: 4px solid var(--blue-500);
    padding: 10px 12px;
    border-radius: 12px;
}

/* basically all we offer section */
.section--omni .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    text-align: center;
}

.tile {
    padding: 22px;
}

.tile__icon {
    font-size: 32px;
    margin-bottom: 6px;
    text-align: center;
}

.section--omni .grid-3>* {
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    padding: 20px;
    border-radius: 10px;
    transition: all 0.3s ease;
}

/* hover */
.section--omni .grid-3>*:hover {
    transform: translateY(-4px);
}

/* Team */
.section--team {
    padding-top: 20px;
}

.team {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-top: 30px;
    
}

.teammate {
    text-align: center;
    padding: 14px;
    border-radius: 25px;
}

.teammate img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    margin-bottom: 8px;
}

/* Sustain */
.sustain__image {
    height: 300px;
    background: url('https://cdn.pixabay.com/photo/2018/11/09/08/08/forest-3804001_1280.jpg') center/cover no-repeat;
}

/* Invest */
.invest__image {
    height: 300px;
    background: url('https://cdn.pixabay.com/photo/2018/05/18/11/05/business-angel-3410930_1280.jpg') center/cover no-repeat;
}

/* Timeline  */
.section--timeline {
    padding-top: 36px;
}

.timeline {
    margin: 22px 0 0;
    padding: 0;
    list-style: none;
    position: relative;
}

.timeline::before {
    content: "";
    position: absolute;
    left: 14px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #dbe8ff;
}

.timeline li {
    position: relative;
    padding-left: 40px;
    margin-bottom: 18px;
}

.timeline .dot {
    position: absolute;
    left: 6px;
    top: 8px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--blue-500);
    box-shadow: 0 0 0 4px #eaf2ff;
}

.timecard {
    padding: 16px;
    background: var(--white);
}


/*  Lists  */
.ticks {
    padding-left: 0;
    list-style: none;
}

.ticks li {
    position: relative;
    padding-left: 24px;
    margin: 8px 0;
}

.ticks li::before {
    content: "✓";
    position: absolute;
    left: 0;
    top: 2px;
    color: var(--blue-500);
    font-weight: 700;
}


/* Responsive */
@media (max-width: 1200px) {
    .team {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 1024px) {
    .hero__wrap {
        grid-template-columns: 1fr;
        
    }
    .hero__wrap h1 {
        padding-top: 150px;
        
    }

    .two-col,
    .two-col--rev {
        grid-template-columns: 1fr;
    }

    .features {
        grid-template-columns: 1fr 1fr;
    }

    .stats__grid {
        grid-template-columns: 1fr 1fr;
    }

    .section--omni .grid-3 {
        grid-template-columns: 1fr;
    }

}

@media (max-width: 800px) {
    .team {
        grid-template-columns: 1fr 1fr;
    
    }
}

@media (max-width: 560px) {
    .features {
        grid-template-columns: 1fr;
    }

    .stats__grid {
        grid-template-columns: 1fr;
    }

    .hero__badges {
        gap: 8px;
    }

    .cta__actions {
        flex-direction: column;
        align-items: stretch;
    }

    .photo--3 {
        display: none;
    }
}
</style>