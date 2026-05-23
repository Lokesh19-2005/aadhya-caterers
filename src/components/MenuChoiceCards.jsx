import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MENU_OPTIONS } from '../data/menuData';

// ──────────────────────────────────────────────────────────────────
// MenuChoiceCards — two premium catering cards (Veg / Non-Veg).
// Used on the Home page and on the /menu hub page.
//
// Each card shows: image header, medallion icon, tagline, title,
// description, plan chips, and a "View Menu →" CTA. Layout is
// mobile-first (stacked) and becomes a 2-column grid on tablet+.
//
// Props:
//   featured  (optional, string)  — e.g. "veg". When set, the card
//             with that key is rendered as the primary highlighted
//             card (larger, "Most Popular Choice" ribbon, "100%
//             Pure Veg" badge for veg, stronger styling). The
//             other card stays elegant and complementary.
// ──────────────────────────────────────────────────────────────────

// Subtle leaf-green palette used only for the "Pure Veg" trust badge.
// Deliberately deep & natural — never neon — so it complements the
// existing gold + maroon brand instead of competing with it.
const VEG_GREEN = {
  border: '#2E7D32',
  dark:   '#1B5E20',
  tint:   'rgba(46,125,50,0.10)',
};

const Card = ({ option, index, isFeatured, hasFeatured }) => {
  const a = option.accent;

  // When another card is featured, this one is "secondary": same
  // elegant style, slightly tighter scale so the featured card
  // visually leads. Never hidden, never washed out.
  const isSecondary = hasFeatured && !isFeatured;

  const headerHeight   = isFeatured ? 240 : isSecondary ? 180 : 200;
  const medallionSize  = isFeatured ? 84  : isSecondary ? 64  : 72;
  const medallionFont  = isFeatured ? '2.2rem' : isSecondary ? '1.65rem' : '1.9rem';
  const bodyPadTop     = isFeatured ? 64 : isSecondary ? 48 : 52;
  const titleFontSize  = isFeatured
    ? 'clamp(1.55rem, 2.7vw, 1.95rem)'
    : isSecondary
      ? 'clamp(1.3rem, 2.1vw, 1.55rem)'
      : 'clamp(1.4rem, 2.4vw, 1.7rem)';

  const baseShadow = '0 14px 36px rgba(139,107,42,0.12)';
  const featuredShadow =
    '0 24px 54px rgba(201,161,74,0.28), 0 0 0 1px rgba(201,161,74,0.30)';
  const restingShadow = isFeatured ? featuredShadow : baseShadow;
  const hoverShadow = isFeatured
    ? '0 32px 70px rgba(201,161,74,0.38), 0 0 0 1px rgba(201,161,74,0.45)'
    : '0 26px 54px rgba(139,107,42,0.22)';
  const restingBorder = isFeatured
    ? '2px solid rgba(201,161,74,0.55)'
    : '1.5px solid rgba(139,107,42,0.22)';

  // Featured-only copy (Veg). Defined here so the data layer stays
  // generic; only the homepage's featured rendering uses these.
  const featuredTagline = 'Pure Vegetarian Catering';
  const featuredDescription =
    'Traditional South Indian veg delights — authentic Telugu and North Indian classics across our Standard and Silver plans, curated for every celebration.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      style={{ height: '100%', position: 'relative' }}
    >
      <Link
        to={option.to}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          textDecoration: 'none',
          background: '#FFFFFF',
          border: restingBorder,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: restingShadow,
          transition:
            'transform 0.4s cubic-bezier(0.2,0.7,0.3,1), box-shadow 0.4s, border-color 0.4s',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = hoverShadow;
          if (!isFeatured) {
            e.currentTarget.style.borderColor = a.ring;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = restingShadow;
          if (!isFeatured) {
            e.currentTarget.style.borderColor = 'rgba(139,107,42,0.22)';
          }
        }}
      >
        {/* "Most Popular Choice" ribbon — featured card only */}
        {isFeatured && (
          <div
            style={{
              position: 'absolute',
              top: 18,
              right: -42,
              background: 'linear-gradient(135deg, #C0392B, #962E22)',
              color: '#FFFBF2',
              padding: '6px 50px',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.66rem',
              fontWeight: 700,
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              transform: 'rotate(40deg)',
              boxShadow: '0 6px 14px rgba(192,57,43,0.40)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          >
            ★ Most Popular
          </div>
        )}

        {/* Top accent band with image + soft tint + medallion */}
        <div style={{ position: 'relative', height: headerHeight, overflow: 'hidden' }}>
          <img
            src={option.image}
            alt={option.label}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'saturate(1.05) contrast(1.04)',
              display: 'block',
            }}
          />
          {/* Tint overlay using accent gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${a.from}55 0%, ${a.mid}33 50%, ${a.to}66 100%)`,
            }}
          />
          {/* Subtle pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(255,251,242,0.10) 18px, rgba(255,251,242,0.10) 36px)',
            }}
          />

          {/* "100% Pure Veg" trust badge — only on the featured veg card.
              Mirrors the official Indian veg-mark (green-on-cream square
              with green dot) so it reads as authentic, not decorative. */}
          {isFeatured && option.key === 'veg' && (
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                padding: '6px 12px 6px 8px',
                background: 'rgba(255,251,242,0.96)',
                border: `1.5px solid ${VEG_GREEN.border}`,
                borderRadius: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                zIndex: 3,
              }}
            >
              {/* Veg-mark: square outline + filled green dot */}
              <span
                style={{
                  width: 14,
                  height: 14,
                  border: `1.5px solid ${VEG_GREEN.border}`,
                  borderRadius: 2,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: VEG_GREEN.border,
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  color: VEG_GREEN.dark,
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                100% Pure Veg
              </span>
            </div>
          )}

          {/* Medallion icon */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: -(medallionSize / 2 - 6),
              transform: 'translateX(-50%)',
              width: medallionSize,
              height: medallionSize,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${a.from} 0%, ${a.mid} 50%, ${a.to} 100%)`,
              border: '4px solid #FFFBF2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: medallionFont,
              boxShadow: '0 10px 22px rgba(0,0,0,0.18)',
              zIndex: 2,
            }}
          >
            {option.icon}
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            padding: `${bodyPadTop}px 28px 28px`,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            textAlign: 'center',
          }}
        >
          {/* Tagline / kicker */}
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              color: a.to,
              fontSize: '0.7rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              justifyContent: 'center',
            }}
          >
            {isFeatured && option.key === 'veg' && (
              <span
                aria-hidden
                style={{
                  color: VEG_GREEN.border,
                  fontSize: '0.95rem',
                  lineHeight: 1,
                }}
              >
                🌿
              </span>
            )}
            <span>
              {isFeatured && option.key === 'veg' ? featuredTagline : option.tagline}
            </span>
          </p>

          <h3
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#3B2A1F',
              fontSize: titleFontSize,
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            {option.label}
          </h3>

          {/* Centered ornament */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              justifyContent: 'center',
              marginBottom: 14,
            }}
          >
            <div
              style={{
                flex: '0 0 40px',
                height: 1,
                background: `linear-gradient(90deg, transparent, ${a.mid})`,
              }}
            />
            <span
              style={{
                color: a.mid,
                fontSize: '0.85rem',
                fontFamily: '"Playfair Display", serif',
              }}
            >
              ✦
            </span>
            <div
              style={{
                flex: '0 0 40px',
                height: 1,
                background: `linear-gradient(90deg, ${a.mid}, transparent)`,
              }}
            />
          </div>

          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              color: '#6B5544',
              fontSize: isFeatured ? '0.98rem' : '0.95rem',
              lineHeight: 1.7,
              marginBottom: 24,
              flex: 1,
            }}
          >
            {isFeatured && option.key === 'veg' ? featuredDescription : option.description}
          </p>

          {/* Plan chips */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: 24,
            }}
          >
            {option.plans.map((p) => (
              <span
                key={p.id}
                style={{
                  padding: '6px 14px',
                  background: a.tint,
                  border: `1px solid ${a.ring}`,
                  borderRadius: 999,
                  fontFamily: '"DM Sans", sans-serif',
                  color: a.to,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >
                {p.title.replace(/Vegetarian |Non-Veg /, '').replace(' Menu', '')}
              </span>
            ))}
          </div>

          {/* CTA pill — uses accent color */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              alignSelf: 'center',
              padding: isFeatured ? '14px 32px' : '13px 28px',
              borderRadius: 999,
              background: `linear-gradient(135deg, ${a.from} 0%, ${a.mid} 50%, ${a.to} 100%)`,
              color: '#FFFBF2',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: isFeatured ? '0.82rem' : '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              boxShadow: `0 10px 24px ${a.ring}`,
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
          >
            View Menu <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default function MenuChoiceCards({ featured = null }) {
  // Two layouts:
  //  - Default (no `featured`): two equal cards, used on the /menu hub.
  //  - Featured (e.g. featured="veg"): asymmetric on tablet+, with the
  //    featured card taking ~58% of the width. Stacks on mobile with
  //    the featured card on top (it's first in the data array).
  const className = `menu-choice-grid${featured ? ' menu-choice-grid--featured' : ''}`;
  return (
    <div className={className}>
      {MENU_OPTIONS.map((option, i) => (
        <Card
          key={option.key}
          option={option}
          index={i}
          isFeatured={featured === option.key}
          hasFeatured={!!featured}
        />
      ))}
    </div>
  );
}
