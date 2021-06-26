using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API_Support_NET.Models
{
    public partial class _21IF4101HelpDeskSupportContext : DbContext
    {
        public _21IF4101HelpDeskSupportContext()
        {
        }

        public _21IF4101HelpDeskSupportContext(DbContextOptions<_21IF4101HelpDeskSupportContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Issue> Issue { get; set; }
        public virtual DbSet<Login> Login { get; set; }
        public virtual DbSet<Supervisor> Supervisor { get; set; }
        public virtual DbSet<Support> Support { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=163.178.107.10;Initial Catalog=21-IF4101-HelpDesk-Support;User ID=laboratorios;Password=KmZpo.2796");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Issue>(entity =>
            {
                entity.HasKey(e => e.ReportNumber)
                    .HasName("PK__Issue__5A964EF959A9B7B5");

                entity.Property(e => e.ReportNumber).ValueGeneratedNever();

                entity.Property(e => e.Classification)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Media')");

                entity.Property(e => e.ReportTime).HasColumnType("datetime");

                entity.Property(e => e.ResolutionComment)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('Ingresado')");

                entity.HasOne(d => d.Support)
                    .WithMany(p => p.Issue)
                    .HasForeignKey(d => d.IdSupport)
                    .HasConstraintName("FK__Issue__IdSupport__5441852A");
            });

            modelBuilder.Entity<Login>(entity =>
            {
                entity.HasKey(e => e.Email)
                    .HasName("PK_Login_1");

                entity.Property(e => e.Email)
                    .HasMaxLength(320)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false);

                entity.Property(e => e.Rol)
                    .IsRequired()
                    .HasMaxLength(3)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Supervisor>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Supervis__A9D1053489F5A691")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(320)
                    .IsUnicode(false);

                entity.Property(e => e.FirstSurname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SecondSurname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Login)
                    .WithOne(p => p.Supervisor)
                    .HasForeignKey<Supervisor>(d => d.Email)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Supervisor_Login");
            });

            modelBuilder.Entity<Support>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Supporte__A9D10534C67AF5C8")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(320)
                    .IsUnicode(false);

                entity.Property(e => e.FirstSurname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IdSupervisor).HasColumnName("id_supervisor");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SecondSurname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Login)
                    .WithOne(p => p.Support)
                    .HasForeignKey<Support>(d => d.Email)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Support_Login");

                entity.HasOne(d => d.Supervisor)
                    .WithMany(p => p.Support)
                    .HasForeignKey(d => d.IdSupervisor)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Support_Supervisor");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
