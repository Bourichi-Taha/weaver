# Use a minimal base image
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the iOS build artifact into the Docker image
COPY ../ios/archive /app/ios/archive
COPY ../ios/WeaverTheme.xcworkspace /app/ios/WeaverTheme.xcworkspace
COPY ../ios/WeaverTheme.xcodeproj /app/ios/WeaverTheme.xcodeproj


# Add any additional setup or configuration as needed
CMD ["tail", "-f", "/dev/null"]