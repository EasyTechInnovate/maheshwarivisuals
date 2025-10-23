#!/bin/bash

# Multi-App Docker Management Script for Maheshwari Visuals
# Supports: User App (Vite), Admin App (Vite), Client App (Next.js), Server (Node.js)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="docker-compose.multi-app.yml"
PROJECT_NAME="maheshwarivisuals"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to show usage
show_usage() {
    echo "Multi-App Docker Management Script"
    echo "Usage: $0 {command} [environment] [service]"
    echo ""
    echo "Commands:"
    echo "  dev              - Start development environment (all apps with hot reload)"
    echo "  qa               - Start QA environment"
    echo "  prod             - Start production environment"
    echo "  stop             - Stop all containers"
    echo "  down             - Stop and remove containers, networks"
    echo "  logs             - Show logs for all services or specific service"
    echo "  build            - Build all images or specific service"
    echo "  rebuild          - Rebuild images (no cache)"
    echo "  status           - Show container status"
    echo "  shell            - Access shell in container"
    echo "  clean            - Clean up unused Docker resources"
    echo "  backup           - Backup database"
    echo "  restore          - Restore database"
    echo ""
    echo "Environments: dev, qa, prod"
    echo "Services: app (user app), admin, client, server, mongo"
    echo ""
    echo "Examples:"
    echo "  $0 dev                    # Start development environment"
    echo "  $0 qa                     # Start QA environment"
    echo "  $0 logs qa client         # Show logs for client service in QA"
    echo "  $0 build qa               # Build QA images"
    echo "  $0 shell dev server       # Access server shell in dev environment"
}

# Function to start development environment
start_dev() {
    print_status "Starting development environment..."
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile development up -d

    print_success "Development environment started!"
    echo ""
    echo "Access your applications:"
    echo "• User App (React Vite):  http://localhost:5173"
    echo "• Admin App (React Vite): http://localhost:8000"
    echo "• Client App (Next.js):   http://localhost:3000"
    echo "• Server API:             http://localhost:5000"
}

# Function to start QA environment
start_qa() {
    print_status "Starting QA environment..."
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile qa up -d

    print_success "QA environment started!"
    echo ""
    echo "Access your applications:"
    echo "• All Apps via Nginx:     http://localhost:8080 or https://localhost:8443"
    echo "• User App:               http://localhost:8080/app"
    echo "• Admin App:              http://localhost:8080/admin"
    echo "• Client App (Main):      http://localhost:8080/"
    echo "• API:                    http://localhost:8080/api"
}

# Function to start production environment
start_prod() {
    print_status "Starting production environment..."
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile production up -d

    print_success "Production environment started!"
    echo ""
    echo "Access your applications:"
    echo "• All Apps via Nginx:     http://localhost or https://localhost"
    echo "• User App:               http://localhost/app"
    echo "• Admin App:              http://localhost/admin"
    echo "• Client App (Main):      http://localhost/"
    echo "• API:                    http://localhost/api"
}

# Function to stop services
stop_services() {
    local env=${1:-"all"}
    print_status "Stopping services..."

    if [ "$env" = "all" ]; then
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile development --profile qa --profile production stop
    else
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile $env stop
    fi

    print_success "Services stopped!"
}

# Function to bring down services
down_services() {
    local env=${1:-"all"}
    print_status "Bringing down services..."

    if [ "$env" = "all" ]; then
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile development --profile qa --profile production down
    else
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile $env down
    fi

    print_success "Services brought down!"
}

# Function to show logs
show_logs() {
    local env=$1
    local service=$2

    if [ -z "$env" ]; then
        print_error "Environment is required for logs command"
        echo "Usage: $0 logs {dev|qa|prod} [service]"
        exit 1
    fi

    if [ -n "$service" ]; then
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile $env logs -f $service
    else
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile $env logs -f
    fi
}

# Function to build services
build_services() {
    local env=$1
    local service=$2

    if [ -z "$env" ]; then
        print_error "Environment is required for build command"
        echo "Usage: $0 build {dev|qa|prod} [service]"
        exit 1
    fi

    print_status "Building images for $env environment..."

    if [ -n "$service" ]; then
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile $env build $service
    else
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile $env build
    fi

    print_success "Build completed!"
}

# Function to rebuild services (no cache)
rebuild_services() {
    local env=$1
    local service=$2

    if [ -z "$env" ]; then
        print_error "Environment is required for rebuild command"
        echo "Usage: $0 rebuild {dev|qa|prod} [service]"
        exit 1
    fi

    print_status "Rebuilding images for $env environment (no cache)..."

    if [ -n "$service" ]; then
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile $env build --no-cache $service
    else
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME --profile $env build --no-cache
    fi

    print_success "Rebuild completed!"
}

# Function to show container status
show_status() {
    print_status "Container status:"
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME ps
}

# Function to access container shell
access_shell() {
    local env=$1
    local service=$2

    if [ -z "$env" ] || [ -z "$service" ]; then
        print_error "Environment and service are required for shell command"
        echo "Usage: $0 shell {dev|qa|prod} {app|admin|client|server}"
        exit 1
    fi

    # Map service names to actual container names
    case $service in
        "app")
            if [ "$env" = "dev" ]; then
                container_name="app"
            else
                container_name="${env}-app"
            fi
            ;;
        "admin")
            if [ "$env" = "dev" ]; then
                container_name="admin"
            else
                container_name="${env}-admin"
            fi
            ;;
        "client")
            if [ "$env" = "dev" ]; then
                container_name="client"
            else
                container_name="${env}-client"
            fi
            ;;
        "server")
            if [ "$env" = "dev" ]; then
                container_name="server"
            else
                container_name="${env}-server"
            fi
            ;;
        *)
            print_error "Invalid service: $service"
            echo "Available services: app, admin, client, server"
            exit 1
            ;;
    esac

    print_status "Accessing shell in $container_name..."
    docker exec -it $container_name /bin/sh
}

# Function to clean up Docker resources
clean_docker() {
    print_status "Cleaning up Docker resources..."
    docker system prune -f
    docker volume prune -f
    print_success "Docker cleanup completed!"
}

# Function to backup database
backup_database() {
    local backup_file="backup_$(date +%Y%m%d_%H%M%S).archive"
    print_status "Creating database backup: $backup_file"

    docker exec mongo_container mongodump --archive=/data/db/$backup_file
    docker cp mongo_container:/data/db/$backup_file ./backups/

    print_success "Database backup created: ./backups/$backup_file"
}

# Function to restore database
restore_database() {
    local backup_file=$1

    if [ -z "$backup_file" ]; then
        print_error "Backup file is required"
        echo "Usage: $0 restore [backup_file]"
        exit 1
    fi

    if [ ! -f "./backups/$backup_file" ]; then
        print_error "Backup file not found: ./backups/$backup_file"
        exit 1
    fi

    print_status "Restoring database from: $backup_file"

    docker cp ./backups/$backup_file mongo_container:/data/db/
    docker exec mongo_container mongorestore --archive=/data/db/$backup_file

    print_success "Database restored from: $backup_file"
}

# Main script logic
check_docker

case $1 in
    "dev")
        start_dev
        ;;
    "qa")
        start_qa
        ;;
    "prod")
        start_prod
        ;;
    "stop")
        stop_services $2
        ;;
    "down")
        down_services $2
        ;;
    "logs")
        show_logs $2 $3
        ;;
    "build")
        build_services $2 $3
        ;;
    "rebuild")
        rebuild_services $2 $3
        ;;
    "status")
        show_status
        ;;
    "shell")
        access_shell $2 $3
        ;;
    "clean")
        clean_docker
        ;;
    "backup")
        backup_database
        ;;
    "restore")
        restore_database $2
        ;;
    *)
        show_usage
        exit 1
        ;;
esac