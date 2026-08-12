# MaxStarrBio

Interactive one-page personal biography for Max Starr.

## Image upload location

Upload every cutout portrait into:

`assets/portraits/`

The current site expects these exact filenames:

1. `01-hero.png`
2. `02-bengals.png`
3. `03-winter.png`
4. `04-vision.png`
5. `05-artist.png`
6. `06-starrboy.png`
7. `07-singer.png`
8. `08-horse.png`
9. `09-velvet.png`
10. `10-current.png`

For the current build, rename the 10 images from the ChatGPT conversation to those filenames before uploading them. PNG with transparency is ideal, but JPG/JPEG can also work if the background has already been removed.

## GitHub upload steps

1. Open the `MaxStarrBio` repository.
2. Open `assets` → `portraits`.
3. Choose **Add file** → **Upload files**.
4. Upload the 10 renamed portrait files.
5. Commit directly to `main`.

After those files are present, the site should render the portraits automatically because `index.html` is already wired to these paths.

## 3D model

The hero currently uses the same StarrTree Seed of Life model already hosted on Cloudinary, so no GLB upload is required for this first version.

## Future portrait archive

Keep all future cutouts in `assets/portraits/`. For the larger archive, use a simple naming convention such as:

- `music-stage-01.png`
- `music-stage-02.png`
- `engineering-01.png`
- `school-ai-01.png`
- `fashion-purple-01.png`

Related images can then be grouped into scroll-driven stop-motion sequences, clone stacks, sticker fields, or large hero takeovers without turning the site into a standard photo gallery.

## Files

- `index.html` — page structure and biography content
- `styles.css` — visual design and responsive layout
- `script.js` — scroll progress, parallax, reveal animation, menu interaction
- `assets/portraits/` — all Max Starr cutout images

This is a static site and can be imported into a static-site host or used as the source repository for a site-building workflow.
