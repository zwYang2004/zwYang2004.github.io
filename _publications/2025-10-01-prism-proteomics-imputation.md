---
title: "PRISM: A Proteomics Robust Imputation framework for Structure-aware Modeling of missingness"
collection: publications
category: manuscripts
# permalink: /publication/2025-10-01-prism-proteomics-imputation
excerpt: 'PRISM is a deep learning framework for proteomics data imputation that combines a denoising convolutional autoencoder and deep matrix factorization to model MNAR missingness while preserving biological structure.'
date: 2025-10-01
venue: 'Nature Communications (under review, preprint)'
paperurl: 'https://doi.org/10.21203/rs.3.rs-7480159/v1'
citation: 'Li, Z., Yang, Z., Chen, Y., & Guo, T. (2025). PRISM: A Proteomics Robust Imputation framework for Structure-aware Modeling of missingness. Nature Communications (under review, preprint).'
---

This work develops **PRISM**, a robust imputation framework for proteomics data with missing-not-at-random (MNAR) values.

Key contributions include:

* Integrates a **Denoising Convolutional Autoencoder (DCAE)** with **Deep Matrix Factorization (DMF)** to jointly model protein intensity patterns and missingness structure.
* Achieves improved imputation accuracy over classical methods (e.g., KNN, MissForest, Gaussian-based approaches) while preserving biological signal.
* Demonstrates that PRISM better maintains downstream biological structure, supporting more reliable differential expression and pathway analysis.
