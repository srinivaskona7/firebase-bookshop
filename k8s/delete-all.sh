#!/bin/bash

# Delete All Kubernetes Resources
# Usage: ./delete-all.sh [namespace]

set -e

NAMESPACE=${1:-fullstack-app}
SCRIPT_DIR=$(dirname "$0")

echo "🗑️  Deleting Full-Stack Node.js Application from Kubernetes"
echo "============================================================"
echo "Namespace: $NAMESPACE"
echo

# Function to safely delete resource
safe_delete() {
    local file=$1
    local namespace=$2
    local resource_name=$(basename "$file" .yaml)
    
    echo "🗑️  Deleting $resource_name..."
    if kubectl delete -f "$file" -n "$namespace" 2>/dev/null; then
        echo "✅ $resource_name deleted"
    else
        echo "⚠️  $resource_name not found or already deleted"
    fi
}

# Delete in reverse order of creation
echo "🗑️  Deleting Ingress..."
kubectl delete -f $SCRIPT_DIR/ingress.yaml -n $NAMESPACE 2>/dev/null || echo "⚠️  Ingress not found"

echo "🗑️  Deleting HPA..."
kubectl delete -f $SCRIPT_DIR/hpa.yaml -n $NAMESPACE 2>/dev/null || echo "⚠️  HPA not found"

echo "🗑️  Deleting Frontend resources..."
kubectl delete -f $SCRIPT_DIR/frontend-service.yaml -n $NAMESPACE 2>/dev/null || echo "⚠️  Frontend service not found"
kubectl delete -f $SCRIPT_DIR/frontend-deployment.yaml -n $NAMESPACE 2>/dev/null || echo "⚠️  Frontend deployment not found"

echo "🗑️  Deleting Backend resources..."
kubectl delete -f $SCRIPT_DIR/backend-service.yaml -n $NAMESPACE 2>/dev/null || echo "⚠️  Backend service not found"
kubectl delete -f $SCRIPT_DIR/backend-deployment.yaml -n $NAMESPACE 2>/dev/null || echo "⚠️  Backend deployment not found"

echo "🗑️  Deleting ConfigMap..."
kubectl delete -f $SCRIPT_DIR/configmap.yaml -n $NAMESPACE 2>/dev/null || echo "⚠️  ConfigMap not found"

echo "🗑️  Deleting Namespace..."
kubectl delete -f $SCRIPT_DIR/namespace.yaml 2>/dev/null || echo "⚠️  Namespace not found"

echo
echo "✅ Cleanup completed!"
echo "📋 Verify deletion: kubectl get all -n $NAMESPACE"