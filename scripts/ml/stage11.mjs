import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'deep-learning-foundations',
  rootStartOrder: 65,
  tree: [
    {
      id: 'neural-network-basics',
      title: 'Neural Network Basics',
      summary: 'Perceptrons, multilayer networks and core components.',
      level: 'intermediate',
      children: [
        {
          id: 'perceptron',
          title: 'The Perceptron',
          children: [
            { id: 'artificial-neuron', title: 'Artificial Neuron' },
            { id: 'perceptron-model', title: 'Perceptron Model' },
            { id: 'perceptron-learning-rule', title: 'Perceptron Learning Rule' },
            { id: 'perceptron-limitations', title: 'Limitations (XOR Problem)' },
          ],
        },
        {
          id: 'multilayer-perceptron',
          title: 'Multilayer Perceptron (MLP)',
          children: [
            { id: 'hidden-layers', title: 'Hidden Layers' },
            { id: 'feedforward-networks', title: 'Feedforward Networks' },
            { id: 'universal-approximation', title: 'Universal Approximation Theorem' },
          ],
        },
        {
          id: 'network-components',
          title: 'Network Components',
          children: [
            { id: 'weights-biases', title: 'Weights & Biases' },
            { id: 'layers', title: 'Layers' },
            { id: 'forward-pass', title: 'Forward Pass' },
          ],
        },
      ],
    },
    {
      id: 'activation-functions',
      title: 'Activation Functions',
      summary: 'Nonlinearities that give networks expressive power.',
      level: 'intermediate',
      children: [
        {
          id: 'why-activations',
          title: 'Why Activations Matter',
          children: [
            { id: 'linear-vs-nonlinear', title: 'Linear vs Nonlinear' },
            { id: 'expressive-power', title: 'Expressive Power' },
          ],
        },
        {
          id: 'common-activations',
          title: 'Common Activations',
          children: [
            { id: 'sigmoid', title: 'Sigmoid' },
            { id: 'tanh', title: 'Tanh' },
            { id: 'relu', title: 'ReLU' },
            { id: 'leaky-relu', title: 'Leaky ReLU' },
            { id: 'elu', title: 'ELU' },
            { id: 'gelu', title: 'GELU' },
            { id: 'swish', title: 'Swish / SiLU' },
          ],
        },
        {
          id: 'output-activations',
          title: 'Output Activations',
          children: [
            { id: 'softmax-output', title: 'Softmax' },
            { id: 'linear-output', title: 'Linear Output' },
            { id: 'sigmoid-output', title: 'Sigmoid Output' },
          ],
        },
        {
          id: 'choosing-activations',
          title: 'Choosing Activations',
          children: [
            { id: 'activation-tradeoffs', title: 'Trade-offs' },
            { id: 'dying-relu', title: 'Dying ReLU Problem' },
          ],
        },
      ],
    },
    {
      id: 'backpropagation',
      title: 'Backpropagation',
      summary: 'How gradients flow backward to train networks.',
      level: 'intermediate',
      children: [
        {
          id: 'backprop-fundamentals',
          title: 'Backpropagation Fundamentals',
          children: [
            { id: 'chain-rule-backprop', title: 'Chain Rule in Backprop' },
            { id: 'computational-graph', title: 'Computational Graph' },
            { id: 'forward-backward-pass', title: 'Forward & Backward Pass' },
          ],
        },
        {
          id: 'gradient-computation-bp',
          title: 'Gradient Computation',
          children: [
            { id: 'automatic-differentiation', title: 'Automatic Differentiation' },
            { id: 'gradient-flow', title: 'Gradient Flow' },
          ],
        },
        {
          id: 'backprop-issues',
          title: 'Backpropagation Challenges',
          children: [
            { id: 'vanishing-gradient-bp', title: 'Vanishing Gradients' },
            { id: 'exploding-gradient-bp', title: 'Exploding Gradients' },
            { id: 'gradient-clipping', title: 'Gradient Clipping' },
          ],
        },
      ],
    },
    {
      id: 'training-neural-networks',
      title: 'Training Neural Networks',
      summary: 'Optimization, initialization, batching and normalization.',
      level: 'intermediate',
      children: [
        {
          id: 'nn-optimization',
          title: 'Optimization for NNs',
          children: [
            { id: 'loss-functions-nn', title: 'Loss Functions' },
            { id: 'optimizers-nn', title: 'Optimizers (SGD, Adam)' },
            { id: 'learning-rate-nn', title: 'Learning Rate' },
            { id: 'lr-schedulers-nn', title: 'Learning Rate Schedulers' },
          ],
        },
        {
          id: 'weight-initialization',
          title: 'Weight Initialization',
          children: [
            { id: 'zero-init-problem', title: 'Why Not Zero Init' },
            { id: 'xavier-glorot', title: 'Xavier / Glorot Initialization' },
            { id: 'he-initialization', title: 'He Initialization' },
          ],
        },
        {
          id: 'batch-training',
          title: 'Batch Training',
          children: [
            { id: 'batch-size', title: 'Batch Size' },
            { id: 'epochs-nn', title: 'Epochs' },
            { id: 'mini-batch-nn', title: 'Mini-Batch Training' },
          ],
        },
        {
          id: 'normalization-layers',
          title: 'Normalization Techniques',
          children: [
            { id: 'batch-normalization', title: 'Batch Normalization' },
            { id: 'layer-normalization', title: 'Layer Normalization' },
            { id: 'group-normalization', title: 'Group Normalization' },
          ],
        },
        {
          id: 'dl-hyperparameters',
          title: 'Deep Learning Hyperparameters',
          children: [
            { id: 'architecture-choices', title: 'Architecture Choices (Depth/Width)' },
            { id: 'tuning-dl', title: 'Tuning Strategies' },
          ],
        },
      ],
    },
    {
      id: 'regularization-deep-learning',
      title: 'Regularization in Deep Learning',
      summary: 'Dropout, weight decay and other generalization techniques.',
      level: 'intermediate',
      children: [
        {
          id: 'dropout-regularization',
          title: 'Dropout',
          children: [
            { id: 'dropout-mechanism', title: 'Dropout Mechanism' },
            { id: 'inverted-dropout', title: 'Inverted Dropout' },
            { id: 'dropout-variants', title: 'Dropout Variants' },
          ],
        },
        {
          id: 'weight-regularization-nn',
          title: 'Weight Regularization',
          children: [
            { id: 'l1-l2-nn', title: 'L1 & L2 Regularization' },
            { id: 'weight-decay', title: 'Weight Decay' },
          ],
        },
        {
          id: 'other-dl-regularization',
          title: 'Other Techniques',
          children: [
            { id: 'early-stopping-nn', title: 'Early Stopping' },
            { id: 'data-augmentation-dl', title: 'Data Augmentation' },
            { id: 'label-smoothing', title: 'Label Smoothing' },
          ],
        },
      ],
    },
    {
      id: 'deep-learning-frameworks',
      title: 'Deep Learning Frameworks',
      summary: 'PyTorch, TensorFlow/Keras and core framework concepts.',
      level: 'intermediate',
      children: [
        {
          id: 'pytorch',
          title: 'PyTorch',
          children: [
            { id: 'tensors-pytorch', title: 'Tensors' },
            { id: 'autograd', title: 'Autograd' },
            { id: 'nn-module', title: 'nn.Module' },
            { id: 'training-loop-pytorch', title: 'Training Loop' },
          ],
        },
        {
          id: 'tensorflow-keras',
          title: 'TensorFlow & Keras',
          children: [
            { id: 'tf-basics', title: 'TensorFlow Basics' },
            { id: 'keras-api', title: 'Keras API' },
            { id: 'model-building-keras', title: 'Building Models' },
          ],
        },
        {
          id: 'framework-concepts',
          title: 'Framework Concepts',
          children: [
            { id: 'gpu-acceleration', title: 'GPU Acceleration' },
            { id: 'computational-graphs-frameworks', title: 'Static vs Dynamic Graphs' },
            { id: 'model-saving-loading', title: 'Saving & Loading Models' },
          ],
        },
      ],
    },
  ],
})
