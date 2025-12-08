# HELM

## What is helm?
Helm is basically a package manager for Kubernetes, kind of like apt for Ubuntu or npm for Node.js, but for managing applications and resources in Kubernetes clusters.

## What helm does
- Helm helps you define, install, and upgrade Kubernetes applications using reusable templates called charts.
- A chart is a package that contains all the Kubernetes manifests (YAML files) needed to deploy an application.
- Helm makes deploying complex applications repeatable and manageable.

## Components

1. Charts
 Is a directory with configuration templates and metadata

2. Releases
 When you install a chart, Helm creates a release, which is a running instance of that chart in your cluster. 
 You can have multiple releases of the same chart with different configurations.

3. Values
Charts have default values in values.yaml.
You can override these values during installation or upgrade to customize your deployment.

Why Use Helm?
Simplifies deployment: Install applications with a single command instead of managing dozens of YAML files manually.
Version control: Helm charts have versions, so you can easily upgrade or roll back.
Templating: Charts use templates to generate Kubernetes manifests dynamically.
Reusability: You can share charts with others or reuse them across projects.
Dependency management: Charts can depend on other charts (subcharts), making multi-component apps easier to deploy.

Helm is a tool that packages Kubernetes applications into charts, making them easy to install, configure, upgrade, and manage. 
It’s especially useful for complex apps with many resources.

# Add a chart repository
Helm uses repositories to store charts. Let’s add Bitnami’s repo (popular, reliable charts):
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update


## What is a helm chart?
A chart is a package of Kubernetes resources (like YAML files) plus templates and metadata.
Think of it as a “ready-to-install application” for Kubernetes.
Each chart has:
- Chart.yaml → Metadata (name, version, description)
- values.yaml → Default configuration values
- templates/ → Kubernetes manifests with placeholders
- charts/ → Optional subcharts (dependencies)

## Creating a helm chart
helm create myapp

## install the chart
helm install my-first-release .

## If you change values.yaml or custom-values.yaml, you can upgrade your release:
helm upgrade my-custom-release . -f custom-values.yaml


