#!/bin/bash

# OctoFit Tracker API Test Script
# This script tests all API endpoints for the Django backend

# Get codespace name or use localhost
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://$CODESPACE_NAME-8000.app.github.dev"
    echo "Testing OctoFit Tracker API on GitHub Codespace: $BASE_URL"
else
    BASE_URL="http://localhost:8000"
    echo "Testing OctoFit Tracker API on localhost: $BASE_URL"
fi

echo "=================================================="
echo "Testing API endpoints..."
echo "=================================================="

# Test API Root
echo "1. Testing API Root:"
curl -s "$BASE_URL/" | jq . 2>/dev/null || curl -s "$BASE_URL/"
echo ""

# Test API base path
echo "2. Testing API Base Path:"
curl -s "$BASE_URL/api/" | jq . 2>/dev/null || curl -s "$BASE_URL/api/"
echo ""

# Test Users endpoint
echo "3. Testing Users endpoint:"
curl -s "$BASE_URL/api/users/" | jq . 2>/dev/null || curl -s "$BASE_URL/api/users/"
echo ""

# Test Teams endpoint
echo "4. Testing Teams endpoint:"
curl -s "$BASE_URL/api/teams/" | jq . 2>/dev/null || curl -s "$BASE_URL/api/teams/"
echo ""

# Test Activities endpoint
echo "5. Testing Activities endpoint:"
curl -s "$BASE_URL/api/activities/" | jq . 2>/dev/null || curl -s "$BASE_URL/api/activities/"
echo ""

# Test Leaderboard endpoint
echo "6. Testing Leaderboard endpoint:"
curl -s "$BASE_URL/api/leaderboard/" | jq . 2>/dev/null || curl -s "$BASE_URL/api/leaderboard/"
echo ""

# Test Workouts endpoint
echo "7. Testing Workouts endpoint:"
curl -s "$BASE_URL/api/workouts/" | jq . 2>/dev/null || curl -s "$BASE_URL/api/workouts/"
echo ""

echo "=================================================="
echo "API testing completed!"
echo "Base URL: $BASE_URL"
echo "=================================================="