# TODO: Replace Image Imports with Direct Links

## Tasks

- [ ] Edit `src/pages/Home.tsx` to remove unused image imports and replace used imports with direct paths (e.g., `/assets/filename.jpg`)
- [ ] Move image files from `src/assets/` to `public/assets/` to enable direct path resolution
- [ ] Test the changes by running the dev server and verifying images load correctly

## Details

- Remove imports for: `trainingImage`, `equipmentImage`, `championshipImage`, `heroImage` (unused)
- Replace imports and usages for: `militaryRaceImage`, `logo`, `armyCheckpointImage`, `instructorTeachingImage`, `teamVictoryImage`
- Update all `src={variable}` to `src="/assets/filename.jpg"`
- Update background image URL in hero section
