# Use the official .NET SDK image for the build process
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 8080

# Set the working directory to /src
WORKDIR /src

# Copy the .csproj file and restore the dependencies
COPY API/API.csproj ./API/API.csproj
RUN dotnet restore ./API/API.csproj

# Copy the entire project
COPY API ./API

# Set the working directory to /src/API
WORKDIR /src/API

# Build the project and publish the output to /app/publish
RUN dotnet publish -c Release -o /app/publish

# build runtime image using the official .NET image for the runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]