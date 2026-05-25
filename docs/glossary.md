# Glossary — Sơn Thuỷ Ký

Vietnamese design terms ↔ implementation references.

## Characters (Playable Party)

The i18n key reflects the character's *power source*, not their personal name.

| Vietnamese | English | Role | i18n key | Actor ID | Class ID | Status |
|---|---|---|---|---|---|---|
| Nguyễn Tuấn | Nguyen Tuan | Tank / Fighter — Sơn Thần (Mountain God's heir) | `{sontinh}` | 1 | 11 Sơn Thần | **Configured** (needs skills tuned) |
| Giang Hải | Giang Hai | Burst DPS / Mage — Thủy Thần (Water God's heir) | `{thuytinh}` | 3 | 12 Thuỷ Thần | **Configured** (needs skills tuned) |
| Ngọc Hoa | Ngoc Hoa | Healer / Support — Tiên (Fairy) | `{hoa}` | 4 | 13 Tiên | **Configured** (needs sprites + skills) |

Note: the i18n keys `{sontinh}` and `{thuytinh}` are historical — they identify the *power source*, not the character's name. The display name comes from `locales/charactor.csv`.

## Characters (NPCs)

| Vietnamese | English | Role | i18n key | Status |
|---|---|---|---|---|
| Sơn Tinh | Mountain God | Mentor god to Tuấn (NPC only) | — (new key TBD) | NPC, referenced in events |
| Thuỷ Tinh | Water God | Mentor god to Hải (NPC only) | — (new key TBD) | NPC, referenced in events |
| Mỵ Nương | Princess Mi Nuong | Modern friend (Prologue) → kidnap target princess (Văn Lang arc) | `{mynuong}` | Actor id=2 (kept) |
| Tiểu Mi | Tieu Mi | Older draft character — may still appear | `{tieumi}` | Unused but key retained |
| Cao Biền | Cao Bien | Final boss antagonist | `{caobien}` | Not implemented |
| Vua Hùng XVIII | King Hung 18 | Quest giver | `{hungking}` | Not implemented |
| Lạc Hầu (KB) | Lac Hau / "KB" | Mysterious helper | — | Not implemented |

## Custom Systems (from GDD §7)

| Vietnamese | English | Implementation Status |
|---|---|---|
| Bóng Tối Gauge | Darkness Gauge (Hải's resource that overflows into loss-of-control) | **v1.1 shipped** — KB_BongToiGauge.js (sprite gauge via Sprite_KBBongToiGauge), State 28, Skills 490/491 |
| Ngọc Hồn | Soul Jade (gating accessory across Ch.2–4) | **v1.0 built** — KB_NgocHonState.js tracks 3-shard convergence; item/armor data entries TBD |
| Sách Ước | Wishing Book (out-of-combat resource, 1–2 uses/chapter) | **NOT BUILT** |
| Summon System | 3 thần thú: Voi (Elephant), Gà (Chicken), Ngựa (Horse) — 1/battle each | **PARTIAL** — Voi & Gà exist as plain enemies, not summons |
| Reputation System | NPC favor → discounts, dialogue, side quests | **NOT BUILT** |
| ATB Gauge | Active Time Battle (vs current STB) | **NOT MATCHING** — STB plugin enabled, need to swap to ATB |
| Convergence (Ngọc Hồn) | Moment when all 3 soul jade shards (Sơn/Thủy/Phong) align, triggering transformation from key item → equipment | **v1.0 built** — idempotent event chain in KB_NgocHonState.js |
| Shard (Ngọc Hồn) | One of three soul jade pieces; tracked via switches `ngochon_son`/`thuy`/`phong` (ids 29/30/31) | **v1.0 built** |

## Key Items (GDD §8)

| Vietnamese | English | Implementation |
|---|---|---|
| Búa Sơn Thần | Mountain God Hammer (Tuấn weapon, early) | Not in Weapons.json |
| Gậy Thần Sinh Tử | Staff of Life and Death (Tuấn weapon, late) | Not in Weapons.json |
| Thủy Xà Kiếm | Water Serpent Sword (Hải weapon, early) | Not in Weapons.json |
| Đồ Long Đao | Dragon-Slaying Saber (Hải weapon, late) | Not in Weapons.json |
| Gậy Phép Mị Nương | Mi Nuong's Magic Staff (Hoa weapon) | Not in Weapons.json |
| Trống Đồng Đông Sơn | Dong Son Bronze Drum (best accessory, 7-piece collection) | Not in Armors.json |
| Hộ Mệnh Amulet | Guardian Amulet (auto-revive 1x) | Not in Armors.json |
| Long Châu | Dragon Pearl (water resist) | Not in Armors.json |
| Long Châu Hắc Ngọc | Black Jade Dragon Pearl (post-game) | Not in Armors.json |
| Lạc Hầu Hộ Phù | Lac Hau's Talisman (curse immunity) | Not in Armors.json |
| Ghost Lantern | Ghost Lantern (hidden path reveal) | Not in Armors.json |
| Linh Vật Cáo | Fox Spirit (+5% gold) | Not in Armors.json |

## Elements (GDD combat triangle)

System.json `elements`: Physical, Fire, Ice, Thunder, Water, Earth, Wind, Light, Darkness.
Sơn = Earth (id 6), Thủy = Water (id 5), Hỏa = Fire (id 2), Phong = Wind (id 7), Ánh Sáng = Light (id 8), Bóng Tối = Darkness (id 9).
Triangle: Sơn (Earth) > Thủy (Water) > Hỏa (Fire) > Sơn. Light ↔ Darkness counter.

## Locations (GDD Chapters)

| Vietnamese | English | Map ID(s) | Status |
|---|---|---|---|
| Núi Tản Viên | Tan Vien Mountain | Map 1 (parent) | Built |
| Văn Lang | Van Lang kingdom | — | Implicit setting |
| Miếu Sơn Tinh | Mountain God Shrine | Map 3 | Built (Prologue) |
| Phong Châu | Phong Chau (capital) | — | **NOT BUILT** |
| Động Đình Hồ | Lake Dong Dinh | — | **NOT BUILT** — Hải's Ch.1B location |
| Làng Ma Xá | Ma Xa Village | — | **NOT BUILT** — Ch.2 Rắn Thần event |
| Kinh Đô | Kinh Do (capital city) | — | **NOT BUILT** — Ch.3/4 hub |

> Existing maps named "SonTinh's Town", "Hero's Hometown", "SonTinhHome", "Peaceful Farm" reflect the older Sơn-Tinh-as-hero design. They can likely be repurposed for Văn Lang towns; renaming TBD.
