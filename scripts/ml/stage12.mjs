import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'deep-learning-architectures',
  rootStartOrder: 71,
  tree: [
    {
      id: 'convolutional-neural-networks',
      title: 'Convolutional Neural Networks (CNNs)',
      summary: 'Convolutions, pooling, classic architectures and key concepts.',
      level: 'intermediate',
      children: [
        {
          id: 'cnn-fundamentals',
          title: 'CNN Fundamentals',
          children: [
            { id: 'convolution-operation', title: 'Convolution Operation' },
            { id: 'filters-kernels', title: 'Filters & Kernels' },
            { id: 'feature-maps', title: 'Feature Maps' },
            { id: 'stride-padding', title: 'Stride & Padding' },
          ],
        },
        {
          id: 'cnn-layers',
          title: 'CNN Layers',
          children: [
            { id: 'convolutional-layers', title: 'Convolutional Layers' },
            { id: 'pooling-layers', title: 'Pooling Layers' },
            { id: 'fully-connected-cnn', title: 'Fully Connected Layers' },
            { id: 'flattening', title: 'Flattening' },
          ],
        },
        {
          id: 'cnn-architectures',
          title: 'CNN Architectures',
          children: [
            { id: 'lenet', title: 'LeNet' },
            { id: 'alexnet', title: 'AlexNet' },
            { id: 'vgg', title: 'VGG' },
            { id: 'inception-googlenet', title: 'Inception / GoogLeNet' },
            { id: 'resnet', title: 'ResNet' },
            { id: 'densenet', title: 'DenseNet' },
            { id: 'efficientnet', title: 'EfficientNet' },
          ],
        },
        {
          id: 'cnn-concepts',
          title: 'Key CNN Concepts',
          children: [
            { id: 'receptive-field', title: 'Receptive Field' },
            { id: 'parameter-sharing', title: 'Parameter Sharing' },
            { id: 'translation-invariance', title: 'Translation Invariance' },
          ],
        },
      ],
    },
    {
      id: 'recurrent-neural-networks',
      title: 'Recurrent Neural Networks (RNNs)',
      summary: 'Sequence modeling with RNNs, LSTMs and GRUs.',
      level: 'intermediate',
      children: [
        {
          id: 'rnn-fundamentals',
          title: 'RNN Fundamentals',
          children: [
            { id: 'sequence-modeling', title: 'Sequence Modeling' },
            { id: 'recurrent-connections', title: 'Recurrent Connections' },
            { id: 'hidden-state', title: 'Hidden State' },
            { id: 'bptt', title: 'Backprop Through Time (BPTT)' },
          ],
        },
        {
          id: 'rnn-problems',
          title: 'RNN Challenges',
          children: [
            { id: 'vanishing-gradient-rnn', title: 'Vanishing Gradients' },
            { id: 'long-term-dependencies', title: 'Long-Term Dependencies' },
          ],
        },
        {
          id: 'lstm',
          title: 'LSTM',
          children: [
            { id: 'lstm-architecture', title: 'LSTM Architecture' },
            { id: 'lstm-gates', title: 'Gates' },
            { id: 'cell-state', title: 'Cell State' },
          ],
        },
        {
          id: 'gru',
          title: 'GRU',
          children: [
            { id: 'gru-architecture', title: 'GRU Architecture' },
            { id: 'gru-vs-lstm', title: 'GRU vs LSTM' },
          ],
        },
        {
          id: 'rnn-variants',
          title: 'RNN Variants',
          children: [
            { id: 'bidirectional-rnn', title: 'Bidirectional RNNs' },
            { id: 'deep-rnn', title: 'Deep / Stacked RNNs' },
            { id: 'encoder-decoder-rnn', title: 'Encoder-Decoder (Seq2Seq)' },
          ],
        },
      ],
    },
    {
      id: 'autoencoders',
      title: 'Autoencoders',
      summary: 'Encoder-decoder networks for representation and generation.',
      level: 'advanced',
      children: [
        {
          id: 'autoencoder-basics',
          title: 'Autoencoder Basics',
          children: [
            { id: 'encoder-decoder', title: 'Encoder & Decoder' },
            { id: 'latent-space', title: 'Latent Space' },
            { id: 'reconstruction-loss', title: 'Reconstruction Loss' },
          ],
        },
        {
          id: 'autoencoder-types',
          title: 'Autoencoder Types',
          children: [
            { id: 'undercomplete-autoencoder', title: 'Undercomplete' },
            { id: 'sparse-autoencoder', title: 'Sparse' },
            { id: 'denoising-autoencoder', title: 'Denoising' },
            { id: 'contractive-autoencoder', title: 'Contractive' },
          ],
        },
        {
          id: 'variational-autoencoders',
          title: 'Variational Autoencoders (VAEs)',
          children: [
            { id: 'vae-concept', title: 'VAE Concept' },
            { id: 'latent-distribution', title: 'Latent Distribution' },
            { id: 'reparameterization-trick', title: 'Reparameterization Trick' },
          ],
        },
        {
          id: 'autoencoder-applications',
          title: 'Applications',
          children: [
            { id: 'ae-dimensionality-reduction', title: 'Dimensionality Reduction' },
            { id: 'ae-anomaly-detection', title: 'Anomaly Detection' },
            { id: 'ae-denoising', title: 'Denoising' },
          ],
        },
      ],
    },
    {
      id: 'transformers',
      title: 'Transformers',
      summary: 'Attention mechanisms and the transformer architecture.',
      level: 'advanced',
      children: [
        {
          id: 'attention-mechanism',
          title: 'Attention Mechanism',
          children: [
            { id: 'attention-concept', title: 'Attention Concept' },
            { id: 'self-attention', title: 'Self-Attention' },
            { id: 'scaled-dot-product', title: 'Scaled Dot-Product Attention' },
            { id: 'multi-head-attention', title: 'Multi-Head Attention' },
          ],
        },
        {
          id: 'transformer-architecture',
          title: 'Transformer Architecture',
          children: [
            { id: 'encoder-decoder-transformer', title: 'Encoder-Decoder Structure' },
            { id: 'positional-encoding', title: 'Positional Encoding' },
            { id: 'feedforward-transformer', title: 'Feedforward Layers' },
            { id: 'residual-layernorm', title: 'Residuals & Layer Norm' },
          ],
        },
        {
          id: 'transformer-models',
          title: 'Transformer Models',
          children: [
            { id: 'bert', title: 'BERT' },
            { id: 'gpt-overview', title: 'GPT' },
            { id: 'vision-transformer', title: 'Vision Transformer (ViT)' },
          ],
        },
        {
          id: 'transformer-concepts',
          title: 'Key Concepts',
          children: [
            { id: 'parallelization', title: 'Parallelization' },
            { id: 'context-length', title: 'Context Length' },
            { id: 'pretraining-finetuning-transformer', title: 'Pretraining & Fine-Tuning' },
          ],
        },
      ],
    },
    {
      id: 'generative-deep-models',
      title: 'Generative Deep Models',
      summary: 'GANs, diffusion models and other deep generative methods.',
      level: 'advanced',
      children: [
        {
          id: 'gans',
          title: 'Generative Adversarial Networks (GANs)',
          children: [
            { id: 'gan-concept', title: 'GAN Concept' },
            { id: 'generator-discriminator', title: 'Generator & Discriminator' },
            { id: 'adversarial-loss', title: 'Adversarial Loss' },
            { id: 'gan-training-challenges', title: 'Training Challenges (Mode Collapse)' },
          ],
        },
        {
          id: 'gan-variants',
          title: 'GAN Variants',
          children: [
            { id: 'dcgan', title: 'DCGAN' },
            { id: 'conditional-gan', title: 'Conditional GAN' },
            { id: 'cyclegan', title: 'CycleGAN' },
            { id: 'stylegan', title: 'StyleGAN' },
            { id: 'wgan', title: 'WGAN' },
          ],
        },
        {
          id: 'diffusion-models',
          title: 'Diffusion Models',
          children: [
            { id: 'diffusion-concept', title: 'Diffusion Concept' },
            { id: 'forward-reverse-process', title: 'Forward & Reverse Process' },
            { id: 'denoising-diffusion', title: 'Denoising Diffusion (DDPM)' },
          ],
        },
        {
          id: 'other-generative-dl',
          title: 'Other Generative Models',
          children: [
            { id: 'normalizing-flows', title: 'Normalizing Flows' },
            { id: 'energy-based-models', title: 'Energy-Based Models' },
          ],
        },
      ],
    },
    {
      id: 'transfer-learning-pretrained',
      title: 'Transfer Learning & Pretrained Models',
      summary: 'Reusing pretrained models and adapting them to new tasks.',
      level: 'intermediate',
      children: [
        {
          id: 'transfer-learning-concepts',
          title: 'Transfer Learning Concepts',
          children: [
            { id: 'feature-extraction-tl', title: 'Feature Extraction' },
            { id: 'fine-tuning-tl', title: 'Fine-Tuning' },
            { id: 'domain-adaptation', title: 'Domain Adaptation' },
          ],
        },
        {
          id: 'pretrained-models',
          title: 'Pretrained Models',
          children: [
            { id: 'imagenet-models', title: 'ImageNet Models' },
            { id: 'model-zoos', title: 'Model Zoos' },
            { id: 'using-pretrained', title: 'Using Pretrained Models' },
          ],
        },
        {
          id: 'transfer-learning-usage',
          title: 'When to Use Transfer Learning',
          children: [
            { id: 'small-data-tl', title: 'Small Data Scenarios' },
            { id: 'freezing-layers', title: 'Freezing Layers' },
          ],
        },
      ],
    },
  ],
})
