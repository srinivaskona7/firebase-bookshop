#!/bin/bash

# Apply All Kubernetes Manifests
# Usage: ./apply-all.sh [namespace]

set -e

NAMESPACE=${1:-fullstack-app}
SCRIPT_DIR=$(dirname "$0")

echo "🚀 Deploying Full-Stack Node.js Application to Kubernetes"
echo "=========================================================="
echo "Namespace: $NAMESPACE"
echo

# Function to check if resource exists
check_resource() {
    local resource_type=$1
    local resource_name=$2
    local namespace=$3
    
    if [ -n "$namespace" ]; then
        kubectl get $resource_type $resource_name -n $namespace >/dev/null 2>&1
    else
        kubectl get $resource_type $resource_name >/dev/null 2>&1
    fi
}

# Function to wait for deployment to be ready
wait_for_deployment() {
    local deployment_name=$1
    local namespace=$2
    echo "⏳ Waiting for deployment $deployment_name to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/$deployment_name -n $namespace
    echo "✅ Deployment $deployment_name is ready"
}

# Step 1: Create namespace
echo "📁 Creating namespace..."
kubectl apply -f $SCRIPT_DIR/namespace.yaml
echo "✅ Namespace created/updated"
echo

# Step 2: Apply ConfigMap
echo "⚙️ Applying ConfigMap..."
kubectl apply -f $SCRIPT_DIR/configmap.yaml -n $NAMESPACE
echo "✅ ConfigMap applied"
echo

# Step 3: Apply Backend resources
echo "🔧 Deploying Backend..."
kubectl apply -f $SCRIPT_DIR/backend-deployment.yaml -n $NAMESPACE
kubectl apply -f $SCRIPT_DIR/backend-service.yaml -n $NAMESPACE
echo "✅ Backend resources applied"
echo

# Wait for backend to be ready
wait_for_deployment "backend-deployment" $NAMESPACE
echo

# Step 4: Apply Frontend resources
echo "🌐 Deploying Frontend..."
kubectl apply -f $SCRIPT_DIR/frontend-deployment.yaml -n $NAMESPACE
kubectl apply -f $SCRIPT_DIR/frontend-service.yaml -n $NAMESPACE
echo "✅ Frontend resources applied"
echo

# Wait for frontend to be ready
wait_for_deployment "frontend-deployment" $NAMESPACE
echo

# Step 5: Apply HPA (optional, requires metrics-server)
echo "📊 Applying Horizontal Pod Autoscalers..."
if kubectl apply -f $SCRIPT_DIR/hpa.yaml -n $NAMESPACE 2>/dev/null; then
    echo "✅ HPA applied successfully"
else
    echo "⚠️  Warning: Could not apply HPA (metrics-server may not be installed)"
fi
echo

# Step 6: Apply Ingress (optional, requires ingress controller)
echo "🌍 Applying Ingress..."
if kubectl apply -f $SCRIPT_DIR/ingress.yaml -n $NAMESPACE 2>/dev/null; then
    echo "✅ Ingress applied successfully"
else
    echo "⚠️  Warning: Could not apply Ingress (ingress controller may not be installed)"
fi
echo

# Step 7: Display deployment status
echo "📋 Deployment Status:"
echo "===================="
kubectl get all -n $NAMESPACE
echo

# Step 8: Display access information
echo "🔗 Access Information:"
echo "====================="

# Get NodePort services
FRONTEND_NODEPORT=$(kubectl get svc frontend-service-nodeport -n $NAMESPACE -o jsonpath='{.spec.ports[0].nodePort}' 2>/dev/null || echo "N/A")
BACKEND_NODEPORT=$(kubectl get svc backend-service-nodeport -n $NAMESPACE -o jsonpath='{.spec.ports[0].nodePort}' 2>/dev/null || echo "N/A")

echo "NodePort Access:"
echo "  Frontend: http://<node-ip>:$FRONTEND_NODEPORT"
echo "  Backend:  http://<node-ip>:$BACKEND_NODEPORT"
echo

# Check if ingress is available
if kubectl get ingress fullstack-app-ingress -n $NAMESPACE >/dev/null 2>&1; then
    INGRESS_IP=$(kubectl get ingress fullstack-app-ingress -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "Pending")
    echo "Ingress Access:"
    echo "  Frontend: http://fullstack-app.local (add to /etc/hosts: $INGRESS_IP fullstack-app.local)"
    echo "  Backend:  http://fullstack-app.local/api"
    echo
fi

echo "Port Forward (for local testing):"
echo "  Frontend: kubectl port-forward svc/frontend-service 3000:3000 -n $NAMESPACE"
echo "  Backend:  kubectl port-forward svc/backend-service 5000:5000 -n $NAMESPACE"
echo

echo "🎉 Deployment completed successfully!"
echo "📊 Monitor with: kubectl get pods -n $NAMESPACE -w"