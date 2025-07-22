# 🚀 Kubernetes Deployment for Full-Stack Node.js Application

This directory contains Kubernetes manifests and deployment scripts for the full-stack Node.js application using the specified Docker images.

## 📦 Docker Images Used

- **Frontend**: `sriniv7654/usermanagement:frontend-latest`
- **Backend**: `sriniv7654/usermanagement:backend-latest`

## 📁 Files Overview

```
k8s/
├── namespace.yaml           # Dedicated namespace for the application
├── configmap.yaml          # Application configuration
├── backend-deployment.yaml # Backend deployment with 3 replicas
├── backend-service.yaml    # Backend ClusterIP and NodePort services
├── frontend-deployment.yaml# Frontend deployment with 2 replicas
├── frontend-service.yaml   # Frontend ClusterIP and NodePort services
├── ingress.yaml            # Ingress for external access with path routing
├── hpa.yaml                # Horizontal Pod Autoscaler for both tiers
├── apply-all.sh           # Script to deploy everything
├── delete-all.sh          # Script to clean up everything
└── README.md              # This documentation
```

## 🚀 Quick Deployment

### Prerequisites
- Kubernetes cluster (minikube, kind, EKS, GKE, AKS, etc.)
- `kubectl` configured and connected to your cluster
- Docker images available in the registry

### Deploy Everything
```bash
# Make scripts executable
chmod +x k8s/apply-all.sh k8s/delete-all.sh

# Deploy to default namespace (fullstack-app)
./k8s/apply-all.sh

# Or deploy to a custom namespace
./k8s/apply-all.sh my-namespace
```

### Clean Up Everything
```bash
# Delete from default namespace
./k8s/delete-all.sh

# Or delete from custom namespace
./k8s/delete-all.sh my-namespace
```

## 📋 Manual Deployment Steps

If you prefer to deploy manually:

```bash
# 1. Create namespace
kubectl apply -f k8s/namespace.yaml

# 2. Apply configuration
kubectl apply -f k8s/configmap.yaml -n fullstack-app

# 3. Deploy backend
kubectl apply -f k8s/backend-deployment.yaml -n fullstack-app
kubectl apply -f k8s/backend-service.yaml -n fullstack-app

# 4. Deploy frontend
kubectl apply -f k8s/frontend-deployment.yaml -n fullstack-app
kubectl apply -f k8s/frontend-service.yaml -n fullstack-app

# 5. (Optional) Apply autoscaling
kubectl apply -f k8s/hpa.yaml -n fullstack-app

# 6. (Optional) Apply ingress
kubectl apply -f k8s/ingress.yaml -n fullstack-app
```

## 🔗 Accessing the Application

### 1. NodePort Access (Direct)
```bash
# Get NodePort numbers
kubectl get svc -n fullstack-app

# Access via NodePort
# Frontend: http://<node-ip>:30000
# Backend:  http://<node-ip>:30001
```

### 2. Port Forward (Local Development)
```bash
# Frontend
kubectl port-forward svc/frontend-service 3000:3000 -n fullstack-app

# Backend
kubectl port-forward svc/backend-service 5000:5000 -n fullstack-app

# Access locally
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000/api
```

### 3. Ingress (Production)
```bash
# Add to /etc/hosts (replace with actual ingress IP)
echo "<ingress-ip> fullstack-app.local" >> /etc/hosts

# Access via domain
# Frontend: http://fullstack-app.local
# Backend:  http://fullstack-app.local/api
```

## 📊 Monitoring and Management

### Check Deployment Status
```bash
# Overall status
kubectl get all -n fullstack-app

# Pod status
kubectl get pods -n fullstack-app -w

# Service endpoints
kubectl get svc -n fullstack-app

# Ingress status
kubectl get ingress -n fullstack-app
```

### View Logs
```bash
# Backend logs
kubectl logs -f deployment/backend-deployment -n fullstack-app

# Frontend logs
kubectl logs -f deployment/frontend-deployment -n fullstack-app

# All pods logs
kubectl logs -f -l app=backend -n fullstack-app
kubectl logs -f -l app=frontend -n fullstack-app
```

### Scale Applications
```bash
# Manual scaling
kubectl scale deployment backend-deployment --replicas=5 -n fullstack-app
kubectl scale deployment frontend-deployment --replicas=3 -n fullstack-app

# Check HPA status
kubectl get hpa -n fullstack-app
```

## ⚙️ Configuration Details

### Environment Variables

**Backend**:
- `PORT`: 5000
- `NODE_ENV`: production
- `FRONTEND_URL`: http://frontend-service:3000

**Frontend**:
- `REACT_APP_API_URL`: http://backend-service:5000/api
- `NODE_ENV`: production

### Resource Limits
- **Backend**: 128Mi-512Mi memory, 100m-500m CPU
- **Frontend**: 128Mi-512Mi memory, 100m-500m CPU

### Auto-scaling
- **Backend**: 2-10 replicas based on 70% CPU, 80% memory
- **Frontend**: 1-5 replicas based on 80% CPU, 85% memory

## 🔧 Troubleshooting

### Common Issues

1. **Pods not starting**
   ```bash
   kubectl describe pod <pod-name> -n fullstack-app
   kubectl logs <pod-name> -n fullstack-app
   ```

2. **Service not accessible**
   ```bash
   kubectl get endpoints -n fullstack-app
   kubectl describe svc <service-name> -n fullstack-app
   ```

3. **Image pull errors**
   ```bash
   # Check if images exist
   docker pull sriniv7654/usermanagement:frontend-latest
   docker pull sriniv7654/usermanagement:backend-latest
   ```

4. **HPA not working**
   ```bash
   # Check metrics server
   kubectl get apiservice v1beta1.metrics.k8s.io
   kubectl top nodes
   kubectl top pods -n fullstack-app
   ```

5. **Ingress not working**
   ```bash
   # Check ingress controller
   kubectl get pods -n ingress-nginx
   kubectl get ingressclass
   ```

### Health Checks

The deployments include:
- **Liveness probes**: Restart unhealthy pods
- **Readiness probes**: Route traffic only to ready pods

Backend health endpoint: `/api/health`
Frontend health endpoint: `/` (serves React app)

## 🔄 Updates and Rollbacks

### Update Images
```bash
# Update backend image
kubectl set image deployment/backend-deployment backend=sriniv7654/usermanagement:backend-v2 -n fullstack-app

# Update frontend image
kubectl set image deployment/frontend-deployment frontend=sriniv7654/usermanagement:frontend-v2 -n fullstack-app

# Check rollout status
kubectl rollout status deployment/backend-deployment -n fullstack-app
kubectl rollout status deployment/frontend-deployment -n fullstack-app
```

### Rollback
```bash
# Rollback backend
kubectl rollout undo deployment/backend-deployment -n fullstack-app

# Rollback frontend
kubectl rollout undo deployment/frontend-deployment -n fullstack-app

# View rollout history
kubectl rollout history deployment/backend-deployment -n fullstack-app
```

## 🛡️ Security Considerations

1. **RBAC**: Consider creating service accounts with minimal permissions
2. **Network Policies**: Implement network segmentation
3. **Secrets**: Use Kubernetes secrets for sensitive data
4. **Image Security**: Scan images for vulnerabilities
5. **Resource Quotas**: Set namespace resource limits

## 🌐 Production Checklist

- [ ] SSL/TLS certificates for ingress
- [ ] Persistent volumes for data storage
- [ ] Backup and disaster recovery
- [ ] Monitoring and alerting (Prometheus, Grafana)
- [ ] Log aggregation (ELK stack)
- [ ] Security scanning and policies
- [ ] Resource quotas and limits
- [ ] Multi-environment setup (dev, staging, prod)

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
- [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)

---

**Built with ❤️ for Kubernetes deployment of the Full-Stack Node.js Application**