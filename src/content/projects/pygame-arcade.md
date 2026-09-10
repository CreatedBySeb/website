---
title: "Pygame Arcade"
link: { name: "Try", url: "https://pygame-arcade.pages.dev/" }
description: "A browser-based Pygame IDE, designed for teaching game development in schools using restrictive devices"
tags: ["education", "python", "research", "pyodide"]
date: 2026-09-02
---

Pygame Arcade is a browser-based development environment for writing 2D games in Python. It leverages the [Pyodide Python distribution](https://pyodide.org/en/stable/), targeting WebAssembly to run a full Python implementation in the browser, and Pyodide's pre-packaged copy of [Pygame Community Edition (pygame-ce)](https://github.com/pygame-community/pygame-ce). I discovered this setup for running Pygame on the web previously while working on a [different project](/thoughts/pygame-on-the-web-with-pyodide).

The motivation behind building a development environment around these tools for writing as well as running games in the browser is to facilitate teaching more complex game development to students. Schools often have limited and restrictive computing resources, with devices like Chromebooks or tablets, which may not support a traditional Python programming environment. Even if one is supported, setting it up correctly and keeping it up to date can be difficult, and working with a local toolchain can be more complicated for a less experienced user who is more familiar with tools like [Scratch](https://scratch.mit.edu/), [MakeCode](https://arcade.makecode.com/) and [Pytch](https://www.pytch.org/). Pygame Arcade helps bridge this gap by removing setup from the equation entirely, running anywhere a web browser can run, and providing a streamlined interface, while still enabling almost all of the functionality of Pygame. This gives students (and teachers) an additional intermediate step between the more limited 'beginner-friendly' environments, and common industry tools or configurations.

Pygame Arcade is still in very active development. Currently, it is nearing the end of 'Phase 1', where core functionality for editing, structuring and running a game is implemented. Pygame Arcade can already run a slightly modified version of the Pygame Aliens example without sound, the only changes are to swap blocking `pygame.time.Clock#tick` with `asyncio.sleep` and making the main function `async`. Audio support is in its final stages, with work mainly focusing on tuning performance across various browser and device configurations. Once audio is completed and some rough edges are addressed, the core functionality will be complete and the Aliens example will be able to run identically to a conventional installation.

Following on from Phase 1, Phase 2 will focus on improving usability and practicality for inexperienced users and in the classroom through introducing things like a project manager, built-in documentation viewer, error location highlighting, asset preview, more demo projects, improved tablet support, and other features in these veins. After Phase 2, Phase 3 will look at building features to facilitate a sharing and remixing community around the platform, similar to what is found on Scratch and [Itch.io](https://itch.io/), so that the tool works well standalone as well as in classroom environments.

Once these phases are complete, Pygame Arcade will be a comprehensive tool for teaching intermediate game development techniques in schools on any readily available hardware, which can be used to develop new game development and computer science curriculums for secondary schools or standalone clubs.

Citation for [the Pygame Arcade poster presented at UKICER 2026 (a SIGCSE conference)](https://dl.acm.org/doi/10.1145/3830800.3830820):

```bibtex showLineNumbers=false
@inproceedings{10.1145/3830800.3830820,
	author = {Dunne Fulmer, S{\'e}bastien},
	title = {Pygame Arcade — A browser-based Pygame IDE},
	year = {2026},
	isbn = {9798400725937},
	publisher = {Association for Computing Machinery},
	address = {New York, NY, USA},
	url = {https://doi.org/10.1145/3830800.3830820},
	doi = {10.1145/3830800.3830820},
	booktitle = {Proceedings of the 2026 United Kingdom and Ireland Computing Education Research},
	articleno = {19},
	numpages = {1},
	series = {UKICER 2026}
}
```
