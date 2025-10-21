# Project 2
This is a small project to test my knowledge on kubernetes

The idea:
- Have two microservices
1. Collector: Basic api rest that reads CPU metrics and maybe network data, 
  stores it and sends via GET /metrics


2. Viewer: Another API that makes request to collector to view the data 
   collector is storing via http




