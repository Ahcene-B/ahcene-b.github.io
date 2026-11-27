---
layout: plain
title: nave-xai
permalink: /software/nave-xai/
description: Concept explanations of vision, time-series and text encoders.
software: true
order: 1
summary: >
  NAVE explanations of frozen encoders (CNNs, ViTs, 1D models, text): which concepts they extract, and where.
  The official package of the ECML PKDD 2026 paper, with notebooks to run on Google Colab and a GIMP plugin.
img: https://raw.githubusercontent.com/Ahcene-B/NAVE/main/docs/assets/example.png
tech: Python package, MIT license
---

<h1 class="page-title">nave-xai</h1>
<p class="page-lead">Concept explanations of vision, time-series and text encoders.</p>


<img src="https://raw.githubusercontent.com/Ahcene-B/NAVE/main/docs/assets/example.png" alt="NAVE explanations" style="width: 100%; max-width: 760px;">

**Which concepts does a vision encoder extract, and where?** nave-xai is the official package of NAVE,
from *Multi-depth Concept Extraction for Post-Hoc Vision Encoder Explanation* (ECML PKDD 2026), with Samuel G. Fadel
and Sebastian Mair. NAVE combines the activations of a frozen encoder at several depths, extracts concepts from them
without supervision, and maps them back onto the input: an explanation of the encoder itself, before any classifier.

- **Images, time series and text:** `NAVEImage` (CNNs and ViTs), `NAVESeries` (1D CNNs, transformers) and `NAVEText`.
- **Ready to use:** a ViT-Ti/16 and ResNets built in, no PyTorch needed; your own PyTorch or ONNX models too.
- **Summaries:** explanations with uncertainty, saliency and concepts' correlation with the predictions.
- **A GIMP plugin:** NAVE superpixels in GIMP 3, *Filters › Generic › NAVE Superpixels…*

```bash
pip install "nave-xai @ git+https://github.com/Ahcene-B/NAVE.git"
```

[Code on GitHub](https://github.com/Ahcene-B/NAVE) ·
[Documentation](https://ahcene-b.github.io/NAVE/) ·
[Paper](https://doi.org/10.1007/978-3-032-37664-0_26) ·
[GIMP plugin](https://github.com/Ahcene-B/NAVE/tree/main/gimp)

### Try it in your browser

Every notebook opens in Google Colab and installs what it needs in its first cell (a Google account is needed; the
training notebooks are best run with a GPU: *Runtime › Change runtime type*).

**Getting started**

| Notebook | What it shows | |
|---|---|---|
| Demo | A tour: explanations, depth, concepts across images, summaries | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/demo.ipynb) |
| Time series | A 1D ResNet on smartwatch motions: segments, snippets, profiles | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/series.ipynb) |
| Text | spaCy's encoder and a topic classifier on Reuters news | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/text.ipynb) |

**Animations**

| Notebook | What it shows | |
|---|---|---|
| Encoder blocks | A ViT or a ResNet, block by block, with UMAP, explanation and saliency | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/01_encoder_blocks.ipynb) |
| Training | A ResNet34 learning Imagenette, checkpoint by checkpoint | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/02_resnet34_training.ipynb) |
| Augmentation | Does the explanation survive rotation, zoom, colour shifts, noise, blur? | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/03_augmentation.ipynb) |
| Supervised and self-supervised | ImageNet against DINO training, for ViT-S/16 and ResNet50 | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/04_supervised_vs_selfsupervised.ipynb) |
| Image atlas | UMAP of the tokens, as points and as the patches themselves | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/05_image_atlas.ipynb) |
| Artifacts | The high-norm tokens of ViTs, and how they relate to the other concepts | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/06_artifacts.ipynb) |
| Shortcut | A mark on one class: a model trained with it and one without | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/07_shortcut.ipynb) |
| Fine-tuning | An ImageNet ResNet34 fine-tuned on satellite images, with CKA per block | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/08_finetuning.ipynb) |
| Overfitting | Few images of two classes: a training image against a validation image | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/09_overfitting.ipynb) |
| Imbalance | One class ten times rarer: how many concepts each class gets | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/animations/10_imbalance.ipynb) |

**Inspecting models**

| Notebook | What it shows | |
|---|---|---|
| Training | Random, supervised and self-supervised weights of the same architecture | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/inspecting/01_training.ipynb) |
| Architectures | ViTs and ResNets on the same photo, and how similar their decompositions are | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/inspecting/02_architectures.ipynb) |
| Depth | Where information is compressed, block by block | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/inspecting/03_depth.ipynb) |
| Registers | ViT artifacts with and without registers (DINOv2) | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/inspecting/04_vit_registers.ipynb) |
| Shortcuts | Measuring whether a spurious cue takes over the explanation | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/inspecting/05_shortcuts.ipynb) |
| Concepts as features | Classifying images from their concepts' proportions | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/inspecting/06_concept_features.ipynb) |
| Localization | Boxes around objects from NAVE's regions | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/inspecting/07_localization.ipynb) |
| Uncertainty | Where the encoder hesitates | [![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Ahcene-B/NAVE/blob/main/notebooks/inspecting/08_uncertainty.ipynb) |
